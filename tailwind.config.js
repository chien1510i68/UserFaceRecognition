/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    screens: {
      'phone': '260px',
      // => @media (min-width: 360px) { ... }
      'tablet': '640px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
      
    },
    extend: {
      fontFamily: {
        logo: ['Vibur', 'SUSE','Roboto'], // Thêm font 'Vibur' vào cấu hình
        title: ['ZCOOL QingKe HuangYou', 'SUSE','Roboto'], // Thêm font 'Vibur' vào cấu hình
        description: ['Montserrat', 'SUSE','Roboto'], // Thêm font 'Vibur' vào cấu hình
      },
      colors : {
        colorPrimary : "#3A97D1"
      }
    },
  },
    
  plugins: [],
}