"use client"
import React, {useEffect, useRef, useState} from 'react';
import './TextArea.css';

interface InputProps {
    error?: boolean;
    errorText?: string;
    placeholder: string;
    setDisabled?: (value: boolean) => void;
    setError?: (value: boolean) => void;
    setValue: (value: string) => void;
    value: string;
    letter?: boolean;
    resize?: boolean;
}

const TextArea: React.FC<InputProps> = ({
                                            value,
                                            setValue,
                                            placeholder,
                                            error,
                                            setError,
                                            errorText,
                                            setDisabled,
                                            letter,
                                            resize
                                        }) => {
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [inputActive, setInputActive] = useState(false);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setInputActive(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <div
                ref={containerRef}
                className={`myTextArea ${inputActive ? 'active' : error ? 'error' : ''} `}
                onClick={() => {
                    if (setError) {
                        setError(false);
                    }
                    setInputActive(true);
                }}
            >
                <textarea
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => {
                        if (setDisabled) {
                            setDisabled(true);
                        }
                        if (letter) {
                            const lettersOnly = e.target.value.replace(/[^A-Za-zА-Я]/g, '');
                            setValue(lettersOnly);
                        } else {
                            setValue(e.target.value);
                        }
                    }}
                    ref={inputRef}
                    style={resize?{resize:"vertical"}:{}}
                />

            </div>
            {error && (
                <div className="myTextArea__errorText">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                    >
                        <path
                            d="M8.58963 1.68802C8.35896 1.25202 7.64163 1.25202 7.41096 1.68802L1.41096 13.0214C1.35695 13.1229 1.33018 13.2368 1.33324 13.3518C1.33631 13.4668 1.36912 13.579 1.42847 13.6776C1.48782 13.7761 1.57168 13.8576 1.6719 13.9142C1.77211 13.9707 1.88525 14.0002 2.0003 14H14.0003C14.1153 14.0003 14.2283 13.9707 14.3285 13.9142C14.4286 13.8578 14.5124 13.7763 14.5717 13.6778C14.631 13.5793 14.6638 13.4671 14.6668 13.3522C14.6698 13.2373 14.643 13.1235 14.589 13.022L8.58963 1.68802ZM8.66696 12H7.33363V10.6667H8.66696V12ZM7.33363 9.33336V6.00002H8.66696L8.66763 9.33336H7.33363Z"
                            fill="#FC4242"
                        />
                    </svg>
                    {errorText}
                </div>
            )}
        </>
    );
};

export default TextArea;