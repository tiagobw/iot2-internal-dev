import { useParams } from 'react-router';
import { ApnPassword } from '~/routes/devices-data/program/apn-password';
import { CheckDriversUpdate } from '~/routes/devices-data/program/check-drivers-update';

import { CommandsCard } from '~/routes/devices-data/program/commands-card';
import { ForceDigitalOutputs } from '~/routes/devices-data/program/force-digital-outputs';
import { ProgramAnalog } from '~/routes/devices-data/program/program-analog';
import { ProgramGps } from '~/routes/devices-data/program/program-gps';
import { ProgramIo } from '~/routes/devices-data/program/program-io';
import { ProgramMobile } from '~/routes/devices-data/program/program-mobile';
import { ProgramMqtt } from '~/routes/devices-data/program/program-mqtt';
import { ProgramOta } from '~/routes/devices-data/program/program-ota';
import { ProgramRs } from '~/routes/devices-data/program/program-rs';
import { ProgramWifi } from '~/routes/devices-data/program/program-wifi';
import { ResetCounters } from '~/routes/devices-data/program/reset-counters';
import { SendModbus } from '~/routes/devices-data/program/send-modbus';

export default function ReadDataHome() {
  const params = useParams();
  const { id } = params;
  const deviceId = Number(id);

  return (
    <div className='flex justify-center flex-wrap gap-4 w-full my-4 px-4'>
      <div className='flex flex-col w-full lg:w-fit gap-4'>
        <ProgramMobile deviceId={deviceId} />
        <ProgramWifi deviceId={deviceId} />
        <ProgramMqtt deviceId={deviceId} />
      </div>
      <div className='flex flex-col w-full lg:w-fit gap-4'>
        <CommandsCard deviceId={deviceId} />
        <CheckDriversUpdate deviceId={deviceId} />
        <ProgramRs deviceId={deviceId} />
      </div>
      <div className='flex flex-col w-full lg:w-fit gap-4'>
        <ApnPassword deviceId={deviceId} />
        <ProgramOta deviceId={deviceId} />
        <SendModbus deviceId={deviceId} />
        <ForceDigitalOutputs deviceId={deviceId} />
        <ResetCounters deviceId={deviceId} />
      </div>
      <div className='flex flex-col w-full lg:w-fit gap-4'>
        <ProgramAnalog deviceId={deviceId} />
        <ProgramIo deviceId={deviceId} />
        <ProgramGps deviceId={deviceId} />
      </div>
    </div>
  );
}
