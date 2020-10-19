import ReactGA from 'react-ga';

// 1. make condition for env
// prd : UA-137552073-1
// sit : UA-137552073-2
// dev : UA-137552073-3
// ReactGA.initialize('UA-137552073-2', { debug: true });


// - "/home/swpc-user/:/usr/local/wi-procurement/static/ga"
if (window.GLOBAL_GA_ENV === 'dev') {
  console.log('ga said dev.........');
  ReactGA.initialize('UA-137552073-3', { debug: true });
}

if (window.GLOBAL_GA_ENV === 'sit') {
  console.log('ga said sit.........');
  ReactGA.initialize('UA-137552073-2', { debug: true });
}

if (window.GLOBAL_GA_ENV === 'prd') {
  console.log('ga said prd.........');
  ReactGA.initialize('UA-137552073-1', { debug: true });
}

// 2. export React GA
export default ReactGA;
