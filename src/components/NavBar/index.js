import React, { useEffect, useRef, useState, useCallback } from 'react';
import logo from 'assets/logo.png';
import Hambuger from 'assets/Hambuger/index.js';
import './style.scss';

const links = [
  { title: 'Shop', link: '/' },
  { title: 'Learn', link: '/learn' },
  { title: 'Account', link: '/account' },
  { title: 'Portals', link: '/portals' },
];

const NavBar = () => {
  const navRef = useRef();
  const currentScroll = useRef();
  const [checked, setChecked] = useState(false);

  const close = useCallback(() => {
    if (checked) {
      setChecked(false);
    }
  }, [checked]);

  useEffect(() => {
    let reqId;

    const scroll =
      window.requestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      };

    const loop = () => {
      if (currentScroll.current !== window.scrollY) {
        currentScroll.current = window.scrollY;

        if (currentScroll.current > 100) {
          navRef.current.classList.add('slide-down');
          navRef.current.style.top = '-200px';
          if (currentScroll.current > 250) {
            navRef.current.style.top = 0;
            navRef.current.style.transition = 'top 0.5s ease';
          }
        } else {
          navRef.current.classList.remove('slide-down');
          navRef.current.style.transition = 'unset';
          navRef.current.style.top = 0;
        }
      }

      reqId = scroll(loop);
    };

    loop();
    window.addEventListener('scroll', close);

    return () => {
      window.removeEventListener('scroll', close);
      window.cancelAnimationFrame(reqId);
    };
  }, [currentScroll, navRef, close]);

  return (
    <header className="mj_nav" ref={navRef}>
      <nav className="main-nav flex-row">
        <div
          className={`nav-collapse flex-row j-space w-full${
            checked ? ' show-overlay' : ''
          }`}
          onClick={close}
        >
          <label className="burger" htmlFor="input-nav">
            <Hambuger width="20px" height="20px" open={checked} />
          </label>

          <input
            type="checkbox"
            id="input-nav"
            value={checked}
            onChange={() => setChecked(!checked)}
          />

          <div
            className={`contents flex-row j-start${checked ? ' open' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="logo">
              <img src={logo} alt="" className="img contain" />
            </div>
            <div className="r_s">
              {links.slice(0, 2).map((link, i) => (
                <a key={`sublink_${i}`} href={link.link} className={'links'}>
                  {link.title}
                </a>
              ))}
            </div>
          </div>

          <div className="l_s">
            {links.slice(2).map((link, i) => (
              <a key={`sublink_${i}`} href={link.link} className={'links'}>
                {link.title}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
