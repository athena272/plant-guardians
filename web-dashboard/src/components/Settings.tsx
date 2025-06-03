import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { mockApi, TargetSpecies } from '../mockApi';

const Settings = () => {
  const queryClient = useQueryClient();
  const [newSpecies, setNewSpecies] = useState('');

  // Busca espécies alvo
  const { data: species, isLoading } = useQuery<TargetSpecies[]>(
    'targetSpecies',
    async () => mockApi.getSpecies()
  );

  // Mutação para atualizar espécie
  const updateSpecies = useMutation(
    async (updatedSpecies: TargetSpecies) => {
      await mockApi.updateSpecies(updatedSpecies);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('targetSpecies');
      },
    }
  );

  // Mutação para adicionar espécie
  const addSpecies = useMutation(
    async (name: string) => {
      await mockApi.addSpecies(name);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('targetSpecies');
        setNewSpecies('');
      },
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSpecies.trim()) {
      addSpecies.mutate(newSpecies.trim());
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>

      {/* Adicionar nova espécie */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Adicionar Espécie Alvo
        </h2>
        <form onSubmit={handleSubmit} className="flex gap-4">
          <input
            type="text"
            value={newSpecies}
            onChange={(e) => setNewSpecies(e.target.value)}
            placeholder="Nome da espécie"
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Adicionar
          </button>
        </form>
      </div>

      {/* Lista de espécies */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            Espécies Alvo Configuradas
          </h2>
        </div>

        {isLoading ? (
          <div className="p-6 text-center text-gray-500">
            Carregando configurações...
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {species?.map((specie) => (
              <li key={specie.name} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={specie.enabled}
                      onChange={(e) =>
                        updateSpecies.mutate({
                          ...specie,
                          enabled: e.target.checked,
                        })
                      }
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <span className="ml-3 text-sm font-medium text-gray-900">
                      {specie.name}
                    </span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Intensidade do Dissuasor
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={specie.deterrent_intensity}
                      onChange={(e) =>
                        updateSpecies.mutate({
                          ...specie,
                          deterrent_intensity: parseInt(e.target.value),
                        })
                      }
                      className="mt-1 block w-full"
                    />
                    <span className="text-sm text-gray-500">
                      {specie.deterrent_intensity}%
                    </span>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Duração (segundos)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={specie.deterrent_duration}
                      onChange={(e) =>
                        updateSpecies.mutate({
                          ...specie,
                          deterrent_duration: parseInt(e.target.value),
                        })
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Settings;