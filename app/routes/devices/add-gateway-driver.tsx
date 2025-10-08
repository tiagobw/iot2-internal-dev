import { useNavigate } from 'react-router';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '~/components/ui/drawer';
import { GatewayDriverForm } from '~/routes/devices/gateway-driver-form';

export default function AddGatewayDriver() {
  const navigate = useNavigate();

  return (
    <Drawer open={true} onClose={() => navigate('/')} direction='right'>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Driver do Gateway</DrawerTitle>
          <DrawerDescription className='sr-only'>
            Adicionar um novo driver do gateway
          </DrawerDescription>
        </DrawerHeader>
        <GatewayDriverForm />
      </DrawerContent>
    </Drawer>
  );
}
