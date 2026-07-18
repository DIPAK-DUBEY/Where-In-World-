import { useEffect, useState } from 'react';
import Sun from '../Images/Sun.svg';
import Moon from '../Images/Moon.svg'
import OnlyFaceAndSmile from '../Images/OnlyFaceAndSmile.svg';
import MoonFace from '../Images/MoonFace.svg'
import { useNavigate } from 'react-router';
import useStore from './ZustandState';
const Navbar = () => {
  const Mode = useStore((store) => store.Mode);
  const setInput = useStore((store) => store.setInput);
  const setMode = useStore((store) => store.setMode);
  const [Animation, SetAnimation] = useState(true);
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  // toggle function
  const toggleTheme = () => {
    setMode(!Mode);
  };
  const StopAnimation = () => {
    SetAnimation(false);
  };
  const StartAnimation = () => {
    SetAnimation(true);
  };
  const toggleclick = ()=>{
    setToggle(!toggle);
    navigate('/');
    
  }
  useEffect(() => {
    setInput("");
  }, [toggle]);
  return (
    <div
      className={`${Mode
        ? 'bg-black/80 backdrop-blur-[18px] border  flex items-center justify-between flex-nowrap fixed top-[20px] left-1/2 -translate-x-1/2 w-[calc(100%-40px)] max-w-[1350px] min-w-[220px] mx-auto px-[30px] py-[15px] rounded-[50px] z-1000 shadow-[0_54px_32px_rgba(0,0,0,0.35),0_0_5px_rgba(255,255,255,0.9)] '
        : 'bg-white/25 backdrop-blur-[18px] border border-white/35 flex items-center justify-between flex-nowrap fixed top-[20px] left-1/2 -translate-x-1/2 w-[calc(100%-40px)] max-w-[1350px] min-w-[220px] mx-auto px-[30px] py-[15px] rounded-[50px] z-1000 shadow-[0_8px_32px_rgba(0,0,0,0.20)] '
        }`}
    >
      <h1 className={`${Mode ? ' text-white   font-semibold cursor-pointer' : 't text-black   font-semibold cursor-pointer'} text-xl max-[300px]:text-[15px]`}
        //
        onClick={() => { toggleclick()}}
      >
       Geo Scopes
      </h1>
      <div>
        <p
          onMouseOver={StopAnimation}
          onMouseOut={StartAnimation}
          onClick={toggleTheme}
          className='m-0 p-0 cursor-pointer'
        >
          {Mode == true ?
            <img
              src={Moon}
              className={
                !Animation
                  ? 'w-[40px] max-[400px]:w-[28px] h-[40px] max-[400px]:h-[28px]'
                  : 'w-[40px] max-[400px]:w-[28px] h-[40px] max-[400px]:h-[28px] animate-[spin_1.2s_linear_infinite]'
              }
              alt=""
            />
            :
            <img
              src={Sun}
              className={
                !Animation
                  ? 'w-[40px] max-[400px]:w-[28px] h-[40px] max-[400px]:h-[28px]'
                  : 'w-[40px] max-[400px]:w-[28px] h-[40px] max-[400px]:h-[28px] animate-[spin_1.2s_linear_infinite]'
              }
              alt=""
            />
          }
          {
            Mode == false ? (

              < img
                className='w-[11px] max-[400px]:w-[9px] absolute  top-[30px] max-[400px]:top-[26px] right-[44px] max-[400px]:right-[39px]'
                src={OnlyFaceAndSmile}
                alt=""
              />

            ) : (
              < img
                className='w-[11px] max-[400px]:w-[8px] absolute  top-[30px] max-[400px]:top-[26px] right-[44px] max-[400px]:right-[40px]'
                src={MoonFace}
                alt=""
              />

            )
          }

        </p>


      </div>

    </div>
  )
}
export default Navbar;