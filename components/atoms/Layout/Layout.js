import React from 'react'
import './Layout.module.scss'
import Nav from '../../organisms/Nav/Nav'

const DescriptionDefault = () => (<p>Descrição</p>)

const Layout = ({
  children,
  title = 'Title',
  description = <DescriptionDefault />,
  className = '',
  showPublicNav = false,
}) => {
  return (
    <>
      <div className="container">
        <Nav skipAuth={showPublicNav} />
        <div className={`hero ${className}`}>
          <h1>{title}</h1>
          <div className="hero__description">
            {description}
          </div>
        </div>

        <main>
          {children}
        </main>
      </div>
      <style jsx global>{`
        :root {
          /* colors */
          --base: #000;
          --base40: #5a606e;
          --base60: #e1e1e1;
          --base80: #fefefe;
          --baseInverse: #fff;
          --primary: #000;
          --red: #fb6d77;

          --border: #e1e1e1;
          --border20: #f2f2f2;
          --bg: #ffffff;
          --bgPrimary: #000;
          --bgLighter: var(--base60);
          --bgLoading: #ECEBEC;
          --error: var(--red);

          /* font-family */
          --font: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
            "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
            sans-serif;

          /* paddings and margins */
          --spacing-xs4: 0.3125rem; // 5px
          --spacing-xs3: 0.625rem; // 10px
          --spacing-xs2: 0.9375rem; // 15px
          --spacing-xs: 1.25rem; // 20px
          --spacing-s: 1.5625rem; // 25px
          --spacing-sm: 1.875rem; // 30px
          --spacing-m: 2.1875rem; // 35px
          --spacing-l: 2.5rem; // 40px
          --spacing-xl: 2.8125rem; // 45px
          --spacing-xl1: 3.125rem; // 50px
          --spacing-xl2: 3.4375rem; // 55px
          --spacing-xl3: 3.75rem; // 60px
          --spacing-xl4: 4.0625rem; // 65px
          --spacing-xl5: 6.25rem; // 100px
          --spacing-xl6: 7.8125rem; // 125px

          /* font-size */
          --size-base: 1rem; // 16px
          --size-xs3: 0.5rem; // 8px
          --size-xs2: 0.75rem; // 12px
          --size-xs: 0.875rem; // 14px
          --size-s: 0.9375rem; // 15px
          --size-m: var(--size-base); // 16px
          --size-xl: 1.125rem; // 18px
          --size-xl2: 1.25rem; // 20px
          --size-xl3: 1.375rem; // 22px
          --size-xl4: 1.5rem; // 24px
          --size-xl5: 1.875rem; // 30px
          --size-xl6: 2.5rem; // 40px
          --size-xl7: 3rem; // 48px
          --size-xl8: 3.5rem; // 56px
          --size-xl9: 4rem; // 64px
          --size-xl10: 8rem; // 128px

          --weight-normal: 400;
          --weight-semibold: 500;
          --weight-bold: 600;

          /* other */
          --borderRadius: 3px;
          --borderRadiusSmall: 2px;
        }

        html,
        body {
          font-family: var(--font);
          width: 100%;
          height: 100%;
          font-size: 16px;
          background-color: var(--bg);
          color: var(--base);
        }

        a {
          color: var(--base);
        }

      form {
        display: inline-flex;
        flex-direction: column;
      }

      /* removes auto-complete blue background */
      input:-webkit-autofill,
      input:-webkit-autofill:hover,
      input:-webkit-autofill:focus,
      input:-webkit-autofill:active  {
          -webkit-box-shadow: 0 0 0 30px white inset !important;
      }

      /* Make clicks pass-through */
      #nprogress {
        pointer-events: none;
      }

      #nprogress .bar {
        background: var(--bgLighter);
        position: fixed;
        z-index: 1031;
        top: 0;
        left: 0;

        width: 100%;
        height: 2px;
      }

      /* Fancy blur effect */
      #nprogress .peg {
        display: block;
        position: absolute;
        right: 0px;
        width: 100px;
        height: 100%;
        opacity: 1;
        -webkit-transform: rotate(3deg) translate(0px, -4px);
        -ms-transform: rotate(3deg) translate(0px, -4px);
        transform: rotate(3deg) translate(0px, -4px);
      }

      /* Remove these to get rid of the spinner */
      #nprogress .spinner {
        display: block;
        position: fixed;
        z-index: 1031;
        bottom: 15px;
        right: 15px;
      }

      #nprogress .spinner-icon {
        width: 18px;
        height: 18px;
        box-sizing: border-box;

        border: solid 2px transparent;
        border-top-color: var(--bgLighter);
        border-left-color: var(--bgLighter);
        border-radius: 50%;

        -webkit-animation: nprogress-spinner 400ms linear infinite;
        animation: nprogress-spinner 400ms linear infinite;
      }

      .nprogress-custom-parent {
        overflow: hidden;
        position: relative;
      }

      .nprogress-custom-parent #nprogress .spinner,
      .nprogress-custom-parent #nprogress .bar {
        position: absolute;
      }

      @-webkit-keyframes nprogress-spinner {
        0% {
          -webkit-transform: rotate(0deg);
        }
        100% {
          -webkit-transform: rotate(360deg);
        }
      }
      @keyframes nprogress-spinner {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }


      `}</style>
    </>
  )
}

export default Layout
