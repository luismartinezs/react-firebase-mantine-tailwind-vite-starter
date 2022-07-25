import { useQuery, useMutation } from 'react-query';

import dataEntriesAPI from './dataEntriesApi';
import queryClient from '@/app/queryClient';
import { useAuth } from '@/services/firebase';
import type { IDataEntry } from './dataEntriesTypes';
import type { IUserData } from '@/features/userData';
import queryKeys from '@/app/queryKeys';

export function useDataEntries() {
  const userData: IUserData | undefined = queryClient.getQueryData([queryKeys.userDataKey, useAuth().currentUser?.uid]);

  return useQuery(
    [queryKeys.dataEntriesKey, userData?.uid],
    async () =>
      await dataEntriesAPI.getDataEntries({
        isAdmin: userData?.isAdmin || false,
      }),
    {
      enabled: !!userData,
    }
  );
}

export function useDataEntry(id: string) {
  const userData: IUserData | undefined = queryClient.getQueryData([queryKeys.userDataKey, useAuth().currentUser?.uid]);

  return useQuery(['entry', id], () => dataEntriesAPI.getDataEntry(id), {
    enabled: !!userData,
  });
}

export function useDeleteDataEntry() {
  return useMutation(async (id: string) => await dataEntriesAPI.deleteDataEntry(id), {
    onSuccess: async (_, id) => {
      await queryClient.invalidateQueries(queryKeys.dataEntriesKey);
      await queryClient.invalidateQueries([queryKeys.dataEntryKey, id], {
        refetchActive: false,
      });
    },
  });
}

export function useCreateDataEntry() {
  return useMutation(async () => await dataEntriesAPI.createDataEntry(), {
    onSuccess: async () => {
      await queryClient.invalidateQueries(queryKeys.dataEntriesKey);
    },
  });
}

export function useEditDataEntry() {
  return useMutation(
    async ({ id, newDataEntry }: { id: string; newDataEntry: IDataEntry }) =>
      dataEntriesAPI.editDataEntry(id, newDataEntry),
    {
      onSuccess: async (_, { id }) => {
        await queryClient.invalidateQueries(queryKeys.dataEntriesKey);
        await queryClient.invalidateQueries([queryKeys.dataEntryKey, id]);
      },
    }
  );
}
