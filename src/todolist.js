import React, { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "cloud-resume-free-todos-v1";

export default function TodoList() {
    const [items, setItems] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        } catch {
            return [];
        }
    });
    const [text, setText] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [removingId, setRemovingId] = useState(null);
    const inputRef = useRef();

    // Inject component-scoped styles once
    useEffect(() => {
        if (document.getElementById("todo-styles")) return;
        const style = document.createElement("style");
        style.id = "todo-styles";
        style.innerHTML = `
            :root{
            
                --bg:#0f1724;
                --card:rgba(255,255,255,0.06);
                --accent:#7c5cff;
                --accent-2:#00d4ff;
                --glass: linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));
            }
            .todo-wrap{
                min-height:100vh;
                display:flex;
                align-items:center;
                justify-content:center;
                padding:48px 16px;
                background: radial-gradient(800px 400px at 10% 10%, rgba(124,92,255,0.12), transparent),
                                        radial-gradient(600px 300px at 90% 90%, rgba(0,212,255,0.06), transparent),
                                        var(--bg);
                font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
                color:#e6eef8;
            }
            .todo-card{
                width:100%;
                max-width:760px;
                background:var(--glass);
                border-radius:14px;
                padding:28px;
                box-shadow: 0 8px 30px rgba(2,6,23,0.6), inset 0 1px 0 rgba(255,255,255,0.02);
                backdrop-filter: blur(8px) saturate(120%);
                border: 1px solid rgba(255,255,255,0.04);
            }
            .todo-header{
                display:flex;
                gap:12px;
                align-items:center;
                margin-bottom:18px;
            }
            .logo{
                width:52px;height:52px;border-radius:10px;
                background: linear-gradient(135deg,var(--accent), var(--accent-2));
                display:flex;align-items:center;justify-content:center;
                font-weight:700;color:white;font-size:18px;
                box-shadow: 0 6px 20px rgba(124,92,255,0.18);
            }
            .title{
                font-size:20px;font-weight:700;
            }
            .subtitle{
                font-size:12px;color:rgba(230,238,248,0.7);
            }

            .input-row{
                display:flex;
                gap:10px;
                margin-bottom:18px;
            }
            .todo-input{
                flex:1;
                padding:12px 14px;
                border-radius:10px;
                border:1px solid rgba(255,255,255,0.06);
                background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
                color:inherit;
                outline:none;
                transition: box-shadow .18s, transform .12s;
                box-shadow: inset 0 1px 0 rgba(255,255,255,0.02);
            }
            .todo-input:focus{
                box-shadow: 0 6px 20px rgba(124,92,255,0.08);
                transform: translateY(-1px);
            }
            .add-btn{
                padding:10px 14px;border-radius:10px;border:0;
                background: linear-gradient(90deg, var(--accent), var(--accent-2));
                color:white;font-weight:700;
                cursor:pointer;
                transition: transform .12s, box-shadow .12s;
            }
            .add-btn:active{ transform: translateY(1px) scale(.995) }

            .list{
                display:flex;flex-direction:column;gap:10px;
            }
            .todo-item{
                display:flex;align-items:center;gap:12px;
                padding:12px;border-radius:10px;
                background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
                border:1px solid rgba(255,255,255,0.03);
                transition: transform .18s, box-shadow .18s, opacity .18s;
                animation: popIn .36s cubic-bezier(.2,.9,.25,1);
            }
            .todo-item:hover{ transform: translateY(-4px); box-shadow: 0 12px 30px rgba(2,6,23,0.45) }
            @keyframes popIn {
                from { opacity:0; transform: translateY(8px) scale(.995) }
                to { opacity:1; transform: translateY(0) scale(1) }
            }
            @keyframes shrinkOut {
                from { opacity:1; transform: scale(1) }
                to { opacity:0; transform: scale(.9) }
            }
            .todo-item.removing{ animation: shrinkOut .28s forwards; }

            .check{
                width:20px;height:20px;border-radius:6px;border:1px solid rgba(255,255,255,0.08);
                display:inline-grid;place-items:center;cursor:pointer;
                background:transparent;flex:0 0 20px;
            }
            .check.checked{ background: linear-gradient(90deg,var(--accent),var(--accent-2)); border: none; color:white; }

            .text{
                flex:1;
                font-size:15px;
                word-break:break-word;
            }
            .text.done{
                text-decoration: line-through;
                color:rgba(230,238,248,0.6);
                transform: translateX(0);
                opacity:.85;
            }
            .controls{ display:flex; gap:8px; align-items:center; }
            .icon-btn{
                background:transparent;border:0;color:rgba(230,238,248,0.8);cursor:pointer;padding:6px;border-radius:8px;
            }
            .icon-btn:hover{ background: rgba(255,255,255,0.02) }

            .edit-input{
                width:100%;
                padding:8px 10px;border-radius:8px;border:1px solid rgba(255,255,255,0.05);
                background:transparent;color:inherit;
            }

            .footer{
                display:flex;justify-content:space-between;align-items:center;margin-top:16px;font-size:13px;color:rgba(230,238,248,0.7);
            }
            .clear-btn{
                background:transparent;border:1px solid rgba(255,255,255,0.04);padding:8px 12px;border-radius:8px;color:inherit;cursor:pointer;
            }
        `;
        document.head.appendChild(style);
    }, []);

    // persist
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }, [items]);

    function addItem(e) {
        e?.preventDefault();
        const v = text.trim();
        if (!v) return;
        const newItem = {
            id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
            text: v,
            done: false,
            createdAt: Date.now(),
        };
        setItems((s) => [newItem, ...s]);
        setText("");
        inputRef.current?.focus();
    }

    function toggleDone(id) {
        setItems((s) => s.map((it) => (it.id === id ? { ...it, done: !it.done } : it)));
    }

    function startRemove(id) {
        setRemovingId(id);
        // allow animation then remove
        setTimeout(() => {
            setItems((s) => s.filter((it) => it.id !== id));
            setRemovingId((cur) => (cur === id ? null : cur));
        }, 280);
    }

    function startEdit(id) {
        setEditingId(id);
    }

    function saveEdit(id, newText) {
        const v = newText.trim();
        if (!v) {
            // if empty delete
            startRemove(id);
        } else {
            setItems((s) => s.map((it) => (it.id === id ? { ...it, text: v } : it)));
            setEditingId(null);
        }
    }

    function clearCompleted() {
        setItems((s) => s.filter((it) => !it.done));
    }

    return (
        <div className="todo-wrap">
            <div className="todo-card" role="application" aria-label="Todo List">
                <div className="todo-header">
                    <div className="logo">CR</div>
                    <div>
                        <div className="title">Cloud Resume — To‑Do</div>
                        <div className="subtitle">Beautiful local storage powered tasks with satisfying animations</div>
                    </div>
                </div>

                <form className="input-row" onSubmit={addItem} aria-label="Add todo">
                    <input
                        ref={inputRef}
                        className="todo-input"
                        placeholder="Add a new task and press Enter..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        aria-label="New todo"
                    />
                    <button className="add-btn" onClick={addItem} aria-label="Add">Add</button>
                </form>

                <div className="list" role="list" aria-live="polite">
                    {items.length === 0 && (
                        <div style={{ opacity: 0.75, padding: 18, borderRadius: 8, border: "1px dashed rgba(255,255,255,0.03)" }}>
                            No tasks yet — add something to get started!
                        </div>
                    )}
                    {items.map((it) => (
                        <div
                            key={it.id}
                            role="listitem"
                            className={`todo-item${removingId === it.id ? " removing" : ""}`}
                        >
                            <button
                                aria-pressed={it.done}
                                title={it.done ? "Mark as not done" : "Mark as done"}
                                className={`check${it.done ? " checked" : ""}`}
                                onClick={() => toggleDone(it.id)}
                            >
                                {it.done ? "✓" : ""}
                            </button>

                            <div className={`text ${it.done ? "done" : ""}`}>
                                {editingId === it.id ? (
                                    <InlineEditor
                                        initial={it.text}
                                        onSave={(v) => saveEdit(it.id, v)}
                                        onCancel={() => setEditingId(null)}
                                    />
                                ) : (
                                    <span onDoubleClick={() => startEdit(it.id)}>{it.text}</span>
                                )}
                            </div>

                            <div className="controls">
                                <button
                                    title="Edit"
                                    className="icon-btn"
                                    onClick={() => startEdit(it.id)}
                                >
                                    ✎
                                </button>
                                <button
                                    title="Delete"
                                    className="icon-btn"
                                    onClick={() => startRemove(it.id)}
                                >
                                    🗑
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="footer">
                    <div>{items.length} item{items.length !== 1 ? "s" : ""}</div>
                    <div style={{ display: "flex", gap: 8 }}>
                        <button
                            onClick={() => setItems((s) => s.map((it) => ({ ...it, done: true })))}
                            className="clear-btn"
                            title="Mark all done"
                        >
                            Mark all done
                        </button>
                        <button onClick={clearCompleted} className="clear-btn" title="Clear completed">
                            Clear completed
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// small inline editor component used inside the same file
function InlineEditor({ initial, onSave, onCancel }) {
    const [v, setV] = useState(initial);
    const ref = useRef();
    useEffect(() => {
        ref.current?.focus();
        ref.current?.select();
    }, []);
    return (
        <input
            ref={ref}
            className="edit-input"
            value={v}
            onChange={(e) => setV(e.target.value)}
            onBlur={() => onSave(v)}
            onKeyDown={(e) => {
                if (e.key === "Enter") onSave(v);
                if (e.key === "Escape") onCancel();
            }}
        />
    );
}