/**
 * title: Default usage
 * desc: Simple countdown management example.
 *
 * title.zh-CN: 基础使用
 * desc.zh-CN: 简单的 countdown 管理示例。
 */

import React from 'react';
import { useCountdown } from 'ahooks';

export default () => {
  const [remaining, actions] = useCountdown();
  const [remaining2, actions2] = useCountdown({ updateRate: 100 });

  return (
    <div>
      <h3>updateRate: 1000</h3>
      <p>remaining: {remaining}</p>
      <button onClick={() => actions.start(10000)}>start(10000)</button>
      <button style={{ marginLeft: 8 }} onClick={actions.pause}>
        pause()
      </button>
      <button style={{ marginLeft: 8 }} onClick={actions.cont}>
        cont()
      </button>
      <button style={{ marginLeft: 8 }} onClick={actions.reset}>
        reset()
      </button>
      <h3 style={{ marginTop: 16 }}>updateRate: 100</h3>
      <p>remaining: {remaining2}</p>
      <button onClick={() => actions2.start(10000)}>start(10000)</button>
      <button style={{ marginLeft: 8 }} onClick={actions2.pause}>
        pause()
      </button>
      <button style={{ marginLeft: 8 }} onClick={actions2.cont}>
        cont()
      </button>
      <button style={{ marginLeft: 8 }} onClick={actions2.reset}>
        reset()
      </button>
    </div>
  );
};
