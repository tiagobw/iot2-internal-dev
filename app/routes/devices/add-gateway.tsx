import { useNavigate } from 'react-router';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '~/components/ui/drawer';
import { GatewayForm } from '~/routes/devices/gateway-form';

export default function AddGateway() {
  const navigate = useNavigate();

  return (
    <Drawer open={true} onClose={() => navigate('/')} direction='right'>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Gateway</DrawerTitle>
          <DrawerDescription className='sr-only'>
            Adicionar um novo gateway
          </DrawerDescription>
        </DrawerHeader>
        <GatewayForm />
      </DrawerContent>
    </Drawer>
  );
}
