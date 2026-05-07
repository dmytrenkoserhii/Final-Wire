import { useRoomStore } from '../../../shared/stores/room.store'
import type { RoomStoreState } from '../../../shared/stores/room.store'

export type RoomContextValue = RoomStoreState

export function useRoom(): RoomContextValue
export function useRoom<T>(selector: (state: RoomContextValue) => T): T
export function useRoom<T = RoomContextValue>(selector?: (state: RoomContextValue) => T) {
  const resolved = (selector ?? ((state: RoomContextValue) => state as unknown as T)) as (
    state: RoomContextValue,
  ) => T
  return useRoomStore(resolved)
}
