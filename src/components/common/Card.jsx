import { motion } from 'framer-motion';
import { cardClasses } from '../../styles/componentClasses';

const Card = ({ 
  children, 
  className = '', 
  hover = true, 
  padding = true,
  onClick,
  ...props 
}) => {
  const baseClasses = cardClasses.base;
  const hoverClasses = hover ? cardClasses.hover : '';
  const paddingClasses = padding ? cardClasses.padding : '';

  const CardComponent = onClick ? motion.button : motion.div;

  return (
    <CardComponent
      className={`${baseClasses} ${hoverClasses} ${paddingClasses} ${className}`}
      onClick={onClick}
      whileHover={hover ? { y: -2, scale: 1.01 } : {}}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </CardComponent>
  );
};

export default Card;