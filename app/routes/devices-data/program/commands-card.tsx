import { AlertDialog } from '~/components/alert-dialog';
import { Button } from '~/components/button';
import { Card } from '~/components/ui/card';
import { usePost } from '~/hooks/api/use-post';
import { withTryCatchAndToast } from '~/routes/devices-data/read-data/with-try-catch-and-toast';

type Props = {
  deviceId: number;
};

export function CommandsCard({ deviceId }: Props) {
  const {
    executePost: executeProgramDrivers,
    isLoadingPost: isLoadingProgramDrivers,
  } = usePost('alx_prg_drivers');
  const {
    executePost: executeClearDrivers,
    isLoadingPost: isLoadingClearDrivers,
  } = usePost('alx_prg_drivers_clear');
  const {
    executePost: executeFactoryReset,
    isLoadingPost: isLoadingFactoryReset,
  } = usePost('alx_prg_gateway_factory');
  const { executePost: executeReset, isLoadingPost: isLoadingReset } =
    usePost('alx_prg_reset');

  const data = [
    {
      onClick: async () =>
        await withTryCatchAndToast(
          async () =>
            await executeProgramDrivers({
              data: {
                device_id: deviceId,
              },
            }),
        ),
      isLoading: isLoadingProgramDrivers,
      text: 'Programar Drivers',
    },
    {
      onClick: async () =>
        await withTryCatchAndToast(
          async () =>
            await executeClearDrivers({
              data: {
                device_id: deviceId,
              },
            }),
        ),
      isLoading: isLoadingClearDrivers,
      text: 'Apagar Todos os Drivers',
    },
    {
      onClick: async () =>
        await withTryCatchAndToast(
          async () =>
            await executeFactoryReset({
              data: {
                device_id: deviceId,
              },
            }),
        ),
      isLoading: isLoadingFactoryReset,
      text: 'Forçar Padrão de Fábrica',
    },
    {
      onClick: async () =>
        await withTryCatchAndToast(
          async () =>
            await executeReset({
              data: {
                device_id: deviceId,
              },
            }),
        ),
      isLoading: isLoadingReset,
      text: 'Forçar Reset',
    },
  ];

  return (
    <Card className='flex flex-col items-center w-full sm:w-110 p-8'>
      <div className='flex gap-4'>
        <h3 className='font-bold'>Comandos</h3>
      </div>
      <div className='flex flex-col gap-2 items-center w-full'>
        {data.map(({ isLoading, onClick, text }) => (
          <AlertDialog
            key={text}
            title='Confirma a execução do comando?'
            onClick={onClick}
            trigger={
              <Button
                className='w-full'
                isLoading={isLoading}
                disabled={isLoading}
              >
                {text}
              </Button>
            }
          />
        ))}
      </div>
    </Card>
  );
}
