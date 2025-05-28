export const buttonClasses = {
  base: 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
  primary: 'bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white shadow-lg hover:shadow-xl focus:ring-primary-500',
  secondary: 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 shadow-sm hover:shadow-md focus:ring-gray-500',
  danger: 'bg-gradient-to-r from-danger-600 to-danger-700 hover:from-danger-700 hover:to-danger-800 text-white shadow-lg hover:shadow-xl focus:ring-danger-500',
  success: 'bg-gradient-to-r from-success-600 to-success-700 hover:from-success-700 hover:to-success-800 text-white shadow-lg hover:shadow-xl focus:ring-success-500',
  warning: 'bg-gradient-to-r from-warning-600 to-warning-700 hover:from-warning-700 hover:to-warning-800 text-white shadow-lg hover:shadow-xl focus:ring-warning-500',
  sizes: {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg'
  }
};

export const cardClasses = {
  base: 'bg-white dark:bg-gray-800 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-700',
  hover: 'hover:shadow-card hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-300',
  padding: 'p-6'
};

export const inputClasses = {
  base: 'w-full rounded-xl border bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
  normal: 'border-gray-200 dark:border-gray-700 focus:border-primary-500 focus:ring-primary-200 dark:focus:ring-primary-800',
  error: 'border-danger-300 dark:border-danger-600 focus:border-danger-500 focus:ring-danger-200 dark:focus:ring-danger-800',
  iconLeft: 'pl-10 pr-4 py-3',
  iconRight: 'pl-4 pr-10 py-3'
};