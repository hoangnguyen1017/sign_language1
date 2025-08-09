import React from 'react';
import google_logo from '../assets/google_logo.svg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: 'blue' | 'gray' | 'google' | 'usenow';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  variant = 'blue',
  fullWidth = true,
  ...rest // Lấy mọi prop còn lại (như type, onClick, disabled, etc.)
}) => {
  const baseStyle: React.CSSProperties = {
    borderRadius: '14px',
    fontSize: '16px',
    fontWeight: 500,
    color: 'white',
    border: 'none',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    width: fullWidth ? '100%' : 'auto',
  };

  const variants: Record<string, React.CSSProperties> = {
    blue: {
      background: 'linear-gradient(90deg, #273C75, #4A69BD)',
      height: '45px',
    },
    gray: {
      background: 'linear-gradient(90deg, #7e7e7e)',
      height: '50px',
    },
    google: {
      background: '#aee4ed',
      color: '#444',
      border: '1px solid #ccc',
      height: '45px',
    },
    usenow: {
      background: 'transparent',
      color: 'white',
      border: '1px solid rgba(255,255,255,0.4)',
      width: '140px',
      height: '42px',
      fontSize: '14px',
      fontWeight: 600,
    },
  };

  const googleIcon = (
    <img src={google_logo} alt="Google logo" style={{ width: 24, height: 24 }} />
  );

  return (
    <button
      style={{ ...baseStyle, ...(variants[variant] || variants.blue) }}
      {...rest} // Bắt buộc để type, onClick, v.v. hoạt động
    >
      {variant === 'google' && googleIcon}
      {label}
    </button>
  );
};

export default Button;
