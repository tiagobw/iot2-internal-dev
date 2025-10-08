import { useParams } from 'react-router';

import { DriversCard } from '~/routes/devices-data/read-data/drivers-card';
import { InfoCard } from '~/routes/devices-data/read-data/info-card';
import { useAnalogStatus } from '~/routes/devices-data/read-data/use-analog-status';
import { useConnectivity } from '~/routes/devices-data/read-data/use-connectivity';
import { useDriversStatus } from '~/routes/devices-data/read-data/use-drivers-status';
import { useGatewayStatus } from '~/routes/devices-data/read-data/use-gateway-status';
import { useGpsStatus } from '~/routes/devices-data/read-data/use-gps-status';
import { useIosPublishing } from '~/routes/devices-data/read-data/use-ios-publishing';
import { useIosStatus } from '~/routes/devices-data/read-data/use-ios-status';
import { useMqttStatus } from '~/routes/devices-data/read-data/use-mqtt-status';
import { useOtaStatus } from '~/routes/devices-data/read-data/use-ota-status';
import { useRsStatus } from '~/routes/devices-data/read-data/use-rs-status';
import { PublishDrivers } from '~/routes/devices-data/read-data/publish-drivers';
import { useGpsPublishing } from '~/routes/devices-data/read-data/use-gps-publishing';

export default function ReadDataHome() {
  const params = useParams();
  const { id } = params;
  const deviceId = Number(id);
  const {
    data: gatewayStatusData,
    isLoading: isLoadingGatewayStatusData,
    callback: getGatewayStatusCallback,
  } = useGatewayStatus(deviceId);
  const {
    data: connectivityData,
    isLoading: isLoadingConnectivityData,
    callback: getConnectivityCallback,
  } = useConnectivity(deviceId);
  const {
    data: gpsStatusData,
    isLoading: isLoadingGpsStatusData,
    callback: getGpsStatusCallback,
  } = useGpsStatus(deviceId);
  const {
    data: mqttStatusData,
    isLoading: isLoadingMqttStatusData,
    callback: getMqttStatusCallback,
  } = useMqttStatus(deviceId);
  const {
    data: iosStatusData,
    isLoading: isLoadingIosStatusData,
    callback: getIosStatusCallback,
  } = useIosStatus(deviceId);
  const {
    data: analogStatusData,
    isLoading: isLoadingAnalogStatusData,
    callback: getAnalogStatusCallback,
  } = useAnalogStatus(deviceId);
  const {
    data: driversStatusData,
    isLoading: isLoadingDriversStatusData,
    callback: getDriversStatusCallback,
  } = useDriversStatus(deviceId);
  const {
    data: rsStatusData,
    isLoading: isLoadingRsStatusData,
    callback: getRsStatusCallback,
  } = useRsStatus(deviceId);
  const {
    data: otaStatusData,
    isLoading: isLoadingOtaStatusData,
    callback: getOtaStatusCallback,
  } = useOtaStatus(deviceId);
  const {
    data: iosPublishingData,
    isLoading: isLoadingIosPublishingData,
    callback: getIosPublishingCallback,
  } = useIosPublishing(deviceId);
  const {
    data: gpsPublishingData,
    isLoading: isLoadingGpsPublishingData,
    callback: getGpsPublishingCallback,
  } = useGpsPublishing(deviceId);

  return (
    <div className='flex justify-center flex-wrap gap-4 w-full my-4 px-4'>
      <div className='flex flex-col w-full lg:w-fit gap-4'>
        <InfoCard
          isLoading={isLoadingGatewayStatusData}
          headerData={{
            title: 'Status do Gateway',
            getDataCallback: getGatewayStatusCallback,
          }}
          bodyData={[
            {
              title: 'Modelo',
              value: gatewayStatusData.model,
            },
            {
              title: 'RAM',
              value: gatewayStatusData.ram,
            },
            {
              title: 'Firmware',
              value: gatewayStatusData.firmware,
            },
            {
              title: 'Tamanho SPIFFs',
              value: gatewayStatusData.spiffsSize,
            },
            {
              title: 'Percentual SPIFFs',
              value: gatewayStatusData.spiffsPercentage,
            },
            {
              title: 'Data',
              value: gatewayStatusData.currentDate,
            },
            {
              title: 'Horário',
              value: gatewayStatusData.currentTime,
            },
            {
              title: 'Status EEPROM',
              value: gatewayStatusData.eepromStatus,
            },
            {
              title: 'Status SPIFFs',
              value: gatewayStatusData.spiffsStatus,
            },
            {
              title: 'Status WiFi',
              value: gatewayStatusData.wifiStatus,
            },
            {
              title: 'Status Mobile',
              value: gatewayStatusData.mobileStatus,
            },
            {
              title: 'Status GNSS',
              value: gatewayStatusData.gpsStatus,
            },
          ]}
        />
        <InfoCard
          isLoading={isLoadingConnectivityData}
          headerData={{
            title: 'Conectividade',
            getDataCallback: getConnectivityCallback,
          }}
          bodyData={[
            {
              title: 'Mobile',
              isSubtitle: true,
            },
            {
              title: 'Status',
              value: `${connectivityData.mobileStatus}`,
            },
            {
              title: 'Rede',
              value: connectivityData.mobileNet,
            },
            {
              title: 'APN',
              value: connectivityData.mobileApn,
            },
            {
              title: 'Usuário',
              value: connectivityData.mobileUser,
            },
            {
              title: 'Senha',
              value: connectivityData.mobilePassword,
            },
            {
              title: 'Operadora',
              value: connectivityData.mobileOperator,
            },
            {
              title: 'ICCID',
              value: connectivityData.mobileIccid,
            },
            {
              title: 'Sinal',
              value: connectivityData.mobileRssi,
            },
            {
              title: 'WiFi',
              isSubtitle: true,
            },
            {
              title: 'Habilitado',
              value: connectivityData.wifiEnabled,
            },
            {
              title: 'Status',
              value: connectivityData.wifiStatus,
            },
            {
              title: 'SSID',
              value: connectivityData.wifiSsid,
            },
            {
              title: 'Senha',
              value: connectivityData.wifiPassword,
            },
            {
              title: 'Sinal',
              value: connectivityData.wifiRssi,
            },
            {
              title: 'Restaurado',
              value: connectivityData.wifiRestored,
            },
          ]}
        />
      </div>
      <div className='flex flex-col w-full lg:w-fit gap-4'>
        <InfoCard
          isLoading={isLoadingGpsStatusData}
          headerData={{
            title: 'GPS',
            getDataCallback: getGpsStatusCallback,
          }}
          bodyData={[
            {
              title: 'Habilitado',
              value: gpsStatusData.enabled,
            },
            {
              title: 'Nº Satélites',
              value: gpsStatusData.satelites,
            },
            {
              title: 'Data',
              value: gpsStatusData.time,
            },
            {
              title: 'Latitude',
              value: gpsStatusData.lat,
            },
            {
              title: 'Longitude',
              value: gpsStatusData.lon,
            },
            {
              title: 'Erro',
              value: gpsStatusData.error,
            },
            {
              title: 'Altitude',
              value: gpsStatusData.high,
            },
            {
              title: 'Velocidade',
              value: gpsStatusData.speed,
            },
            {
              title: 'Azimute',
              value: gpsStatusData.azimute,
            },
          ]}
        />
        <InfoCard
          isLoading={isLoadingMqttStatusData}
          headerData={{
            title: 'MQTT',
            getDataCallback: getMqttStatusCallback,
          }}
          bodyData={[
            {
              title: 'Habilitado',
              value: mqttStatusData.enabled,
            },
            { title: 'Qos', value: mqttStatusData.qos },
            {
              title: 'Retain',
              value: mqttStatusData.retain,
            },
            {
              title: 'Status',
              value: mqttStatusData.status,
            },
            {
              title: 'Host',
              value: mqttStatusData.host,
            },
            {
              title: 'Porta',
              value: mqttStatusData.port,
            },
            {
              title: 'Usuário',
              value: mqttStatusData.user,
            },
            {
              title: 'Senha',
              value: mqttStatusData.password,
            },
            {
              title: 'Tópico Publicação',
              value: mqttStatusData.topic_pub,
            },
            {
              title: 'Tópico Subscrição',
              value: mqttStatusData.topic_sub,
            },
            {
              title: 'Restaurado',
              value: mqttStatusData.restored,
            },
          ]}
        />
        <InfoCard
          isLoading={isLoadingIosStatusData}
          headerData={{
            title: 'Status IOs',
            getDataCallback: getIosStatusCallback,
          }}
          bodyData={[
            {
              title: 'DI 1',
              value: iosStatusData.di1,
            },
            { title: 'DI 2', value: iosStatusData.di2 },
            {
              title: 'Cont. DI 1',
              value: iosStatusData.ct1,
            },
            { title: 'Cont. DI 2', value: iosStatusData.ct2 },
            {
              title: 'Freq. DI 1',
              value: iosStatusData.freq1,
            },
            {
              title: 'Freq. DI 2',
              value: iosStatusData.freq2,
            },
            {
              title: 'AI 1',
              value: iosStatusData.ea1,
            },
            {
              title: 'AI 2',
              value: iosStatusData.ea2,
            },
          ]}
        />
        <InfoCard
          isLoading={isLoadingAnalogStatusData}
          headerData={{
            title: 'Programação Analógicas',
            getDataCallback: getAnalogStatusCallback,
          }}
          bodyData={[
            {
              title: 'AI 1',
              value: analogStatusData.ea1Prg,
            },
            { title: 'AI 2', value: analogStatusData.ea2Prg },
          ]}
        />
      </div>
      <div className='flex flex-col w-full lg:w-fit gap-4'>
        <DriversCard
          headerData={{
            title: 'Drivers',
            getDataCallback: getDriversStatusCallback,
          }}
          tableData={driversStatusData}
          isLoading={isLoadingDriversStatusData}
        />
        <InfoCard
          isLoading={isLoadingRsStatusData}
          headerData={{
            title: 'RS-232/RS-485',
            getDataCallback: getRsStatusCallback,
          }}
          bodyData={[
            {
              title: 'velocidade',
              value: rsStatusData.baud_rate,
            },
            {
              title: 'Bits de Dados',
              value: rsStatusData.data_bits,
            },
            {
              title: 'Stop Bits',
              value: rsStatusData.stop_bits,
            },
            {
              title: 'Paridade',
              value: rsStatusData.parity,
            },
            {
              title: 'Endereço',
              value: rsStatusData.modbuss_address,
            },
            {
              title: 'Intra Frames',
              value: rsStatusData.intra_frames,
            },
          ]}
        />
        <InfoCard
          isLoading={isLoadingOtaStatusData}
          headerData={{
            title: 'OTA',
            getDataCallback: getOtaStatusCallback,
          }}
          bodyData={[
            {
              title: 'Habilitado',
              value: otaStatusData.enabled,
            },
            { title: 'Horário', value: otaStatusData.time },
          ]}
        />
        <InfoCard
          isLoading={isLoadingIosPublishingData}
          headerData={{
            title: 'Publicação IOs',
            getDataCallback: getIosPublishingCallback,
          }}
          bodyData={[
            {
              title: 'Tempo',
              value: iosPublishingData.time,
            },
            { title: 'DI 1 Máscara', value: iosPublishingData.di1_mask },
            { title: 'DI 2 Máscara', value: iosPublishingData.di2_mask },
            {
              title: 'Cont. DI 1',
              value: iosPublishingData.ct1_pub_value,
            },
            { title: 'Cont. DI 2', value: iosPublishingData.ct2_pub_value },
            {
              title: 'Freq. DI 1',
              value: iosPublishingData.freq1_pub_value,
            },
            {
              title: 'Freq. DI 2',
              value: iosPublishingData.freq2_pub_value,
            },
            { title: 'Erro AI 1', value: iosPublishingData.ea1_error },
            { title: 'Erro AI 2', value: iosPublishingData.ea2_error },
            { title: 'AI 1 máscara', value: iosPublishingData.ea1_mask },
            { title: 'AI 2 máscara', value: iosPublishingData.ea2_mask },
            { title: 'AI 1 valor', value: iosPublishingData.ea1_pub_value },
            { title: 'AI 2 valor', value: iosPublishingData.ea2_pub_value },
          ]}
        />
        <PublishDrivers deviceId={deviceId} />
        <InfoCard
          isLoading={isLoadingGpsPublishingData}
          headerData={{
            title: 'Publicação GPS',
            getDataCallback: getGpsPublishingCallback,
          }}
          bodyData={[
            {
              title: 'Habilitado',
              value: gpsPublishingData.enabled,
            },
            {
              title: 'Periodicidade',
              value: gpsPublishingData.time,
            },
          ]}
        />
      </div>
    </div>
  );
}
