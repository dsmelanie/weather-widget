import './Error.scss';

interface ErrorProps {
  city: string;
}

function Error({ city }: ErrorProps) {
  return (
    <div className='error'>
      <p className='error-message'>"{city}" cannot be found, please try again.</p>
    </div>
  );
}

export default Error;
