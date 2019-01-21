import React, { Component } from 'react';

/* TODO:
Написать реализацию компонента DashboardTimer, чтобы он:
1. Отображал все непустые таймеры из всех задач
    1.1 Желательно отображать в виде списка в формате "JD-1: 00:02:35 [остановить/запустить][сбросить]"
    1.2 Скрывать все таймеры, кроме первого под, кат
    1.3 Первым показывать активный таймер, или таймер в котором были последние изменения
2. Синхронизировал отображаемые таймеры с таймерами на страницах задач
3. При переключении таймеров из этого окна исходная сортировка сохранялась
*/
class DashboardTimer extends Component {
    render() {
        return ('Timers list');
    }
}

export default DashboardTimer;
