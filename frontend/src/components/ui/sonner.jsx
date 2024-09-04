import React from 'react';
import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"
import PropTypes from 'prop-types';


const Toaster = ({
  ...props
}) => {
  const { theme = "system" } = useTheme()

  return (
    (<Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props} />)
  );
}


Toaster.propTypes = {
  className: PropTypes.string,   // Define the expected type for className
  variant: PropTypes.string,     // Define the expected type for variant
};

export { Toaster }
