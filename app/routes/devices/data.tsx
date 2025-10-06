type DataFromApi = {
  id: number;
  model: string;
  driver: string | null;
  serial_id: string;
  enabled: boolean;
  last_comm: string | null;
  comm_failure: boolean | null;
  screen_type: string | null;
  gateway: boolean;
};

export type Data = {
  id: number;
  model: string;
  driver: string;
  serialId: string;
  isEnabled: boolean;
  lastComm: string;
  commFailure: boolean;
  screenType: string;
  gateway: boolean;
};

const dataFromApi: DataFromApi[] = [
  {
    id: 3,
    model: 'ALX-4GS',
    driver: 'alx_4gs.dll',
    serial_id: '00000001',
    enabled: true,
    last_comm: null,
    comm_failure: null,
    screen_type: 'alx_4gs',
    gateway: true,
  },
  {
    id: 4,
    model: 'ALX-10 2A',
    driver: null,
    serial_id: '00000001',
    enabled: true,
    last_comm: null,
    comm_failure: null,
    screen_type: null,
    gateway: false,
  },
];

export const data: Data[] = dataFromApi.map((item) => ({
  id: item.id,
  model: item.model,
  driver: item.driver ?? 'N/A',
  serialId: item.serial_id,
  isEnabled: item.enabled,
  lastComm: item.last_comm ?? 'N/A',
  commFailure: item.comm_failure ?? false,
  screenType: item.screen_type ?? 'N/A',
  gateway: item.gateway,
}));
