import ReactDOM from 'react-dom/client'
import { port } from './port';
import Reader from './pages/reader';
import style from './style.module.less';

const App = ({initData}: {initData: any}) => {
  return (
    <div id={style['moyu-reader-contnet-window']}>
      <div className="window-header">
        <span className="close">x</span>
      </div>
      <Reader chapter={initData} />
    </div>
  );
}

const insertWindow = (initData: any) => {
  const oldDom = document.querySelector('#moyu-chrome-chrome-plugin-insert-container')
  if (oldDom) {
    document.body.removeChild(oldDom);
  }
  const AppDom = document.createElement('div');
  AppDom.setAttribute('id', 'moyu-chrome-chrome-plugin-insert-container');
  document.body.appendChild(AppDom);

  ReactDOM.createRoot(AppDom).render(
    <App initData={initData} />
  )
};

port.onMessage.addListener(({ type, value }: { type: string, value: any }) => {
  if (type === 'open') {
    insertWindow(value);
  }
});