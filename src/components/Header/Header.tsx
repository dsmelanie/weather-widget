import { FormEvent } from 'react';
import logo from '../../assets/logo.png';

import './Header.scss';

interface HeaderProps {
  onSubmit: (cityName: string) => void;
}

function Header({ onSubmit }: HeaderProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const cityName = formData.get("cityInput") as string;
    onSubmit(cityName);
  };

  return (
    <header className='header'>
      <h2 className='header-title'><img width='50px' src={logo} alt="Logo"/> Weather Widget</h2>
      <form className='header-form' onSubmit={handleSubmit}>
        <input className='header-input' type="text" name="cityInput" placeholder='Enter a city..' />
      </form>
    </header>
  );
}

export default Header;
