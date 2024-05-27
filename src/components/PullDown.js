import React, { useEffect, useRef } from 'react';

export const PullDown = (props) => {
    return <select name="month">
        <option value="jan">1月</option>
        <option value="feb">2月</option>
        <option value="mar">3月</option>
        <option value="apr">4月</option>
        <option value="may">5月</option>
        <option value="jun">6月</option>
        <option value="jul">7月</option>
        <option value="aug">8月</option>
        <option value="sep">9月</option>
        <option value="oct">10月</option>
        <option value="nov">11月</option>
        <option value="dec">12月</option>
    </select>;
}
