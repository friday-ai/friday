import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UndrawWorld from '../../../components/Illustrations/UndrawWorld';
import Favicon from '../../../components/Illustrations/Favicon';

interface Language {
  code: string;
  name: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'es', name: 'Español' },
  { code: 'pt', name: 'Portuguese' },
];

function Language({ submit }: { submit: (code: string) => void }) {
  const navigate = useNavigate();
  const [language, setLanguage] = useState<Language>({ code: 'en', name: 'English' });

  const handleNextStep = () => {
    submit(language.code);
    navigate('/signup/account');
  };

  return (
    <div className="card-base flex flex-col items-center p-10 h-4/5 w-4/5 xl:w-3/5 overflow-auto">
      <div className="mb-5 flex-none">
        <Favicon width="60" height="60" />
      </div>

      <span className="text-xl mb-5 flex-none">Choose your language</span>

      <div className="flex flex-row grow w-full justify-evenly md:space-x-20">
        <div className="hidden sm:block">
          <UndrawWorld width="auto" height="auto" />
        </div>
        <div className="flex flex-col space-y-4 basis-full sm:basis-1/2 md:basis-11/12 lg:basis-6/12">
          <ul className="menu p-2">
            {languages.map((l) => (
              <li key={l.code}>
                <button type="button" className={`${language.code === l.code && 'active'}`} onClick={() => setLanguage(l)}>
                  {l.name}
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

export default Language;
