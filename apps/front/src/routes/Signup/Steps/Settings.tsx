import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Favicon from '../../../components/Illustrations/Favicon';
import UndrawSettings from '../../../components/Illustrations/UndrawSettings';

interface Settings {
  code: string;
  name: string;
}

const units: Settings[] = [
  { code: 'metric', name: 'Celsius (°C), SI (Metric)' },
  { code: 'us', name: 'Fahrenheit (°F), MI (Miles)' },
];

const history: Settings[] = [
  { code: '1 month', name: '1 month' },
  { code: '3 month', name: '3 month' },
  { code: '6 month', name: '6 month' },
  { code: '1 year', name: '1 year' },
  { code: 'unlimited', name: 'unlimited' },
];

function Settings({ submit }: { submit: (units: string, history: string) => void }) {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({ units: 'us', history: '3 month' });

  const handleChange = (key: string, value: string) => {
    setSettings((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleNextStep = () => {
    submit(settings.units, settings.history);
    navigate('/signup/house');
  };

  return (
    <div className="card-base flex flex-col items-center p-10 h-4/5 w-4/5 xl:w-3/5 overflow-auto">
      <div className="mb-5 flex-none">
        <Favicon width="60" height="60" />
      </div>

      <span className="text-xl mb-5 flex-none">Global settings</span>

      <div className="flex flex-row grow w-full justify-evenly md:space-x-20">
        <div className="hidden sm:block">
          <UndrawSettings width="" height="" />
        </div>
        <div className="flex flex-col space-y-4 basis-full sm:basis-1/2 md:basis-11/12 lg:basis-6/12">
          <span className="text-primary font-bold">Choose units</span>
          <ul className="menu p-2">
            {units.map((u) => (
              <li key={u.code}>
                <button type="button" className={`${settings.units === u.code && 'active'}`} onClick={() => handleChange('units', u.code)}>
                  {u.name}
                </button>
              </li>
            ))}
          </ul>
          <span className="text-primary font-bold">Choose how many time keep the history of states</span>
          <ul className="menu p-2">
            {history.map((h) => (
              <li key={h.code}>
                <button type="button" className={`${settings.history === h.code && 'active'}`} onClick={() => handleChange('history', h.code)}>
                  {h.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button type="button" className="btn btn-sm self-end flex-none mt-5" onClick={handleNextStep}>
        Next step
      </button>
    </div>
  );
}

export default Settings;
