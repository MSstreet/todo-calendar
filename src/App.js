import React, { useState, useEffect } from 'react';

const App = () => {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentView, setCurrentView] = useState('month');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentDayDate, setCurrentDayDate] = useState(new Date());
  const [scheduledTodos, setScheduledTodos] = useState(() => {
    const saved = localStorage.getItem('scheduledTodos');
    return saved ? JSON.parse(saved) : {};
  });
  const [todoInput, setTodoInput] = useState('');
  const [draggedTodo, setDraggedTodo] = useState(null);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  // PWA 설치 프롬프트 감지
  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    });

    // 이미 설치된 경우 감지
    window.addEventListener('appinstalled', () => {
      setShowInstallButton(false);
    });
  }, []);

  // 앱 설치 함수
  const installApp = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowInstallButton(false);
      }
      setDeferredPrompt(null);
    }
  };

  // 데이터 변경 시 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('scheduledTodos', JSON.stringify(scheduledTodos));
  }, [scheduledTodos]);

  // 스타일 정의
  const styles = {
    body: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: '#f5f5f5',
      padding: '20px',
      margin: 0
    },
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      background: 'white',
      borderRadius: '10px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      padding: '20px'
    },
    h1: {
      textAlign: 'center',
      color: '#333',
      marginBottom: '30px'
    },
    mainContent: {
      display: 'flex',
      gap: '20px',
      '@media (max-width: 768px)': {
        flexDirection: 'column'
      }
    },
    todoSection: {
      flex: '1',
      borderRight: '1px solid #ddd',
      paddingRight: '20px'
    },
    calendarSection: {
      flex: '2'
    },
    todoInput: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      fontSize: '16px',
      marginBottom: '10px',
      boxSizing: 'border-box'
    },
    addBtn: {
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      width: '100%',
      marginBottom: '20px'
    },
    todoList: {
      listStyle: 'none',
      padding: 0,
      margin: 0
    },
    todoItem: {
      backgroundColor: '#f9f9f9',
      padding: '10px',
      marginBottom: '10px',
      borderRadius: '5px',
      border: '1px solid #ddd',
      cursor: 'move',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    deleteBtn: {
      backgroundColor: '#f44336',
      color: 'white',
      border: 'none',
      padding: '5px 10px',
      borderRadius: '3px',
      cursor: 'pointer',
      fontSize: '12px'
    },
    viewTabs: {
      display: 'flex',
      gap: '10px',
      marginBottom: '20px'
    },
    tab: {
      padding: '10px 20px',
      border: 'none',
      backgroundColor: '#ddd',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px'
    },
    tabActive: {
      padding: '10px 20px',
      border: 'none',
      backgroundColor: '#4CAF50',
      color: 'white',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px'
    },
    calendarView: {
      display: 'none'
    },
    calendarViewActive: {
      display: 'block'
    },
    monthCalendar: {
      width: '100%',
      borderCollapse: 'collapse'
    },
    monthCalendarTh: {
      border: '1px solid #ddd',
      padding: '10px',
      textAlign: 'center',
      backgroundColor: '#4CAF50',
      color: 'white'
    },
    monthCalendarTd: {
      border: '1px solid #ddd',
      padding: '10px',
      textAlign: 'center',
      height: '100px',
      verticalAlign: 'top'
    },
    calendarDay: {
      fontWeight: 'bold',
      marginBottom: '5px'
    },
    calendarTodos: {
      fontSize: '12px',
      textAlign: 'left'
    },
    weekSchedule: {
      display: 'grid',
      gridTemplateColumns: '60px repeat(7, 1fr)',
      gap: '10px'
    },
    timeSchedule: {
      display: 'grid',
      gridTemplateColumns: '60px 1fr',
      gap: '10px'
    },
    timeLabel: {
      textAlign: 'right',
      paddingRight: '10px',
      fontWeight: 'bold',
      color: '#666',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height: '100px'
    },
    timeSlot: {
      border: '1px solid #ddd',
      height: '100px',
      backgroundColor: '#f9f9f9',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column'
    },
    halfHourSlot: {
      flex: 1,
      borderBottom: '1px dashed #ddd',
      padding: '5px',
      position: 'relative'
    },
    halfHourSlotLast: {
      flex: 1,
      padding: '5px',
      position: 'relative'
    },
    scheduledTodo: {
      backgroundColor: '#2196F3',
      color: 'white',
      padding: '5px',
      borderRadius: '3px',
      marginBottom: '3px',
      fontSize: '14px'
    },
    dayHeader: {
      textAlign: 'center',
      fontWeight: 'bold',
      padding: '10px',
      backgroundColor: '#f0f0f0'
    },
    weekTimeLabel: {
      textAlign: 'right',
      paddingRight: '10px',
      fontWeight: 'bold',
      color: '#666',
      gridColumn: '1'
    }
  };

  // Todo 관련 함수
  const addTodo = () => {
    const text = todoInput.trim();
    
    if (text) {
      const todo = {
        id: Date.now(),
        text: text,
        completed: false
      };
      setTodos([...todos, todo]);
      setTodoInput('');
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
    
    // 스케줄에서도 삭제
    const newScheduledTodos = { ...scheduledTodos };
    Object.keys(newScheduledTodos).forEach(key => {
      newScheduledTodos[key] = newScheduledTodos[key].filter(todo => todo.id !== id);
    });
    setScheduledTodos(newScheduledTodos);
  };

  // 드래그 앤 드롭 관련 함수
  const handleDragStart = (e, todo) => {
    setDraggedTodo(todo);
  };

  const handleDrop = (e, scheduleKey) => {
    e.preventDefault();
    
    if (draggedTodo) {
      const newScheduledTodos = { ...scheduledTodos };
      if (!newScheduledTodos[scheduleKey]) {
        newScheduledTodos[scheduleKey] = [];
      }
      
      // 중복 체크
      if (!newScheduledTodos[scheduleKey].find(t => t.id === draggedTodo.id)) {
        newScheduledTodos[scheduleKey].push({ ...draggedTodo });
        setScheduledTodos(newScheduledTodos);
      }
    }
    
    e.currentTarget.style.backgroundColor = '#f9f9f9';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.style.backgroundColor = '#e8f5e9';
  };

  const handleDragLeave = (e) => {
    e.currentTarget.style.backgroundColor = '#f9f9f9';
  };

  // 월별 캘린더 렌더링
  const renderMonthCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const rows = [];
    let days = [];
    
    // 빈 칸 채우기
    for (let i = 0; i < firstDay; i++) {
      days.push(<td key={`empty-${i}`} style={styles.monthCalendarTd}></td>);
    }
    
    // 날짜 채우기
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${year}-${month + 1}-${day}`;
      const dayTodos = scheduledTodos[dateKey] || [];
      
      days.push(
        <td
          key={day}
          style={styles.monthCalendarTd}
          onDrop={(e) => handleDrop(e, dateKey)}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <div style={styles.calendarDay}>{day}</div>
          <div style={styles.calendarTodos}>
            {dayTodos.map(todo => (
              <div key={todo.id} style={{ fontSize: '11px', color: '#2196F3' }}>
                {todo.text}
              </div>
            ))}
          </div>
        </td>
      );
      
      if ((firstDay + day) % 7 === 0) {
        rows.push(<tr key={`row-${rows.length}`}>{days}</tr>);
        days = [];
      }
    }
    
    if (days.length > 0) {
      rows.push(<tr key={`row-${rows.length}`}>{days}</tr>);
    }
    
    return (
      <table style={styles.monthCalendar}>
        <thead>
          <tr>
            <th style={styles.monthCalendarTh}>일</th>
            <th style={styles.monthCalendarTh}>월</th>
            <th style={styles.monthCalendarTh}>화</th>
            <th style={styles.monthCalendarTh}>수</th>
            <th style={styles.monthCalendarTh}>목</th>
            <th style={styles.monthCalendarTh}>금</th>
            <th style={styles.monthCalendarTh}>토</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  };

  // 주간 스케줄 렌더링
  const renderWeekSchedule = () => {
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    const headerCells = [<div key="empty"></div>];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      headerCells.push(
        <div key={`header-${i}`} style={styles.dayHeader}>
          {dayNames[i]} ({date.getMonth() + 1}/{date.getDate()})
        </div>
      );
    }
    
    const rows = [];
    rows.push(headerCells);
    
    for (let hour = 0; hour < 24; hour++) {
      const hourCells = [
        <div key={`time-${hour}`} style={styles.weekTimeLabel}>
          {hour}:00
        </div>
      ];
      
      for (let day = 0; day < 7; day++) {
        const date = new Date(weekStart);
        date.setDate(weekStart.getDate() + day);
        
        const cells = [];
        
        // 0-30분 슬롯
        const firstHalfKey = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${hour}-0`;
        const firstHalfTodos = scheduledTodos[firstHalfKey] || [];
        cells.push(
          <div
            key="0-30"
            style={styles.halfHourSlot}
            onDrop={(e) => handleDrop(e, firstHalfKey)}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            {firstHalfTodos.map(todo => (
              <div key={todo.id} style={styles.scheduledTodo}>
                {todo.text}
              </div>
            ))}
          </div>
        );
        
        // 30-60분 슬롯
        const secondHalfKey = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${hour}-30`;
        const secondHalfTodos = scheduledTodos[secondHalfKey] || [];
        cells.push(
          <div
            key="30-60"
            style={styles.halfHourSlotLast}
            onDrop={(e) => handleDrop(e, secondHalfKey)}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            {secondHalfTodos.map(todo => (
              <div key={todo.id} style={styles.scheduledTodo}>
                {todo.text}
              </div>
            ))}
          </div>
        );
        
        hourCells.push(
          <div key={`slot-${day}`} style={styles.timeSlot}>
            {cells}
          </div>
        );
      }
      
      rows.push(hourCells);
    }
    
    return (
      <div style={styles.weekSchedule}>
        {rows.flat()}
      </div>
    );
  };

  // 일일 스케줄 렌더링
  const renderDaySchedule = () => {
    const year = currentDayDate.getFullYear();
    const month = currentDayDate.getMonth();
    const day = currentDayDate.getDate();
    
    const rows = [];
    
    for (let hour = 0; hour < 24; hour++) {
      rows.push(
        <div key={`time-${hour}`} style={styles.timeLabel}>
          {hour}:00
        </div>
      );
      
      const cells = [];
      
      // 0-30분 슬롯
      const firstHalfKey = `${year}-${month + 1}-${day}-${hour}-0`;
      const firstHalfTodos = scheduledTodos[firstHalfKey] || [];
      cells.push(
        <div
          key="0-30"
          style={styles.halfHourSlot}
          onDrop={(e) => handleDrop(e, firstHalfKey)}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {firstHalfTodos.map(todo => (
            <div key={todo.id} style={styles.scheduledTodo}>
              {todo.text}
            </div>
          ))}
        </div>
      );
      
      // 30-60분 슬롯
      const secondHalfKey = `${year}-${month + 1}-${day}-${hour}-30`;
      const secondHalfTodos = scheduledTodos[secondHalfKey] || [];
      cells.push(
        <div
          key="30-60"
          style={styles.halfHourSlotLast}
          onDrop={(e) => handleDrop(e, secondHalfKey)}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {secondHalfTodos.map(todo => (
            <div key={todo.id} style={styles.scheduledTodo}>
              {todo.text}
            </div>
          ))}
        </div>
      );
      
      rows.push(
        <div key={`slot-${hour}`} style={styles.timeSlot}>
          {cells}
        </div>
      );
    }
    
    return (
      <div style={styles.timeSchedule}>
        {rows}
      </div>
    );
  };

  const previousMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() - 1);
    setCurrentMonth(newMonth);
  };

  const nextMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + 1);
    setCurrentMonth(newMonth);
  };

  const previousDay = () => {
    const newDay = new Date(currentDayDate);
    newDay.setDate(newDay.getDate() - 1);
    setCurrentDayDate(newDay);
  };

  const nextDay = () => {
    const newDay = new Date(currentDayDate);
    newDay.setDate(newDay.getDate() + 1);
    setCurrentDayDate(newDay);
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h1 style={styles.h1}>Todo List 일정 관리</h1>
        
        {showInstallButton && (
          <button 
            onClick={installApp} 
            style={{
              ...styles.addBtn,
              marginBottom: '20px',
              backgroundColor: '#2196F3'
            }}
          >
            앱으로 설치하기
          </button>
        )}
        
        <div style={styles.mainContent}>
          <div style={styles.todoSection}>
            <h2>Todo List</h2>
            <input
              type="text"
              style={styles.todoInput}
              placeholder="할 일을 입력하세요"
              value={todoInput}
              onChange={(e) => setTodoInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            />
            <button onClick={addTodo} style={styles.addBtn}>추가</button>
            <ul style={styles.todoList}>
              {todos.map(todo => (
                <li
                  key={todo.id}
                  style={styles.todoItem}
                  draggable={true}
                  onDragStart={(e) => handleDragStart(e, todo)}
                >
                  <span>{todo.text}</span>
                  <button
                    style={styles.deleteBtn}
                    onClick={() => deleteTodo(todo.id)}
                  >
                    삭제
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div style={styles.calendarSection}>
            <div style={styles.viewTabs}>
              <button
                style={currentView === 'month' ? styles.tabActive : styles.tab}
                onClick={() => setCurrentView('month')}
              >
                월
              </button>
              <button
                style={currentView === 'week' ? styles.tabActive : styles.tab}
                onClick={() => setCurrentView('week')}
              >
                주
              </button>
              <button
                style={currentView === 'day' ? styles.tabActive : styles.tab}
                onClick={() => setCurrentView('day')}
              >
                일
              </button>
            </div>
            
            <div style={currentView === 'month' ? styles.calendarViewActive : styles.calendarView}>
              <h3>
                {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
              </h3>
              <button onClick={previousMonth}>이전</button>
              <button onClick={nextMonth}>다음</button>
              {renderMonthCalendar()}
            </div>
            
            <div style={currentView === 'week' ? styles.calendarViewActive : styles.calendarView}>
              <h3>주간 일정</h3>
              {renderWeekSchedule()}
            </div>
            
            <div style={currentView === 'day' ? styles.calendarViewActive : styles.calendarView}>
              <h3>
                {currentDayDate.getFullYear()}년 {currentDayDate.getMonth() + 1}월 {currentDayDate.getDate()}일
              </h3>
              <button onClick={previousDay}>이전</button>
              <button onClick={nextDay}>다음</button>
              {renderDaySchedule()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;