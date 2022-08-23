// import React, { useRef, useEffect } from 'react';
//
// import { StageContext } from '../context';
//
// const Stage = (
//   {
//     controller,
//     children,
//   },
// ) => {
//   const ref = useRef();
//
//   const page = '';
//
//   if (!ref.current) {
//     if (typeof controller === 'function') {
//       ref.current = new controller(page);
//     } else {
//       ref.current = controller;
//     }
//   }
//
//   useEffect(() => {
//     if (ref.current) {
//       ref.current.onMount && ref.current.onMount(page);
//     }
//
//     return () => {
//       if (ref.current) {
//         ref.current.onUnmount && ref.current.onUnmount(page);
//       }
//     };
//   }, []);
//
//   return (
//     <StageContext.Provider value={{ controller: ref.current }}>
//       {children}
//     </StageContext.Provider>
//   );
// };
//
// export default Stage;
