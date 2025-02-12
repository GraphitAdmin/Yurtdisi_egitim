import React from "react";
import Link from "next/link";

interface LogoProps {
    color: string;
}

const Logo: React.FC<LogoProps> = ({color}) => {
    return (
        <>
            <Link href='/' className="flex flex-row items-center gap-3 justify-center"
                  style={{height: 56, minHeight: 56}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="160" height="48"
                     style={{height: 48, maxHeight: 48, width: 'auto'}} viewBox="0 0 160 48" fill={color}>
                    <path
                        d="M31.4516 34H1.50968V0.283872H31.4516V8.78839H10.9703V12.8142H30.6968V21.2684H10.9703V25.4955H31.4516V34ZM47.5265 34.5032C38.9214 34.5032 32.8827 30.8297 32.8827 21.3187C32.8827 13.0658 38.871 8.13419 47.3252 8.13419C56.0814 8.13419 61.6672 12.5123 61.6672 20.6645C61.6672 21.52 61.6169 22.1742 61.5162 23.08H41.6388C41.7898 26.1497 43.1485 27.0052 47.1743 27.0052C50.9988 27.0052 52.0052 26.351 52.0052 24.8413V24.2877H61.4659V24.8916C61.4659 30.5277 56.0814 34.5032 47.5265 34.5032ZM47.1239 15.3806C43.6517 15.3806 42.1923 16.1355 41.7898 18.2994H52.5085C52.1562 16.1355 50.6465 15.3806 47.1239 15.3806ZM77.5844 34.5032C68.9793 34.5032 62.9406 30.8297 62.9406 21.3187C62.9406 13.0658 68.929 8.13419 77.3832 8.13419C86.1393 8.13419 91.7251 12.5123 91.7251 20.6645C91.7251 21.52 91.6748 22.1742 91.5741 23.08H71.6967C71.8477 26.1497 73.2064 27.0052 77.2322 27.0052C81.0567 27.0052 82.0632 26.351 82.0632 24.8413V24.2877H91.5238V24.8916C91.5238 30.5277 86.1393 34.5032 77.5844 34.5032ZM77.1819 15.3806C73.7096 15.3806 72.2502 16.1355 71.8477 18.2994H82.5664C82.2141 16.1355 80.7044 15.3806 77.1819 15.3806ZM105.026 34.5032C97.2759 34.5032 92.9985 29.5213 92.9985 21.3187C92.9985 13.0658 97.1753 8.13419 104.623 8.13419C110.611 8.13419 113.429 10.9523 114.184 15.1794H114.688V0.283872H124.148V34H115.291V27.1561H114.788C113.983 32.1884 110.964 34.5032 105.026 34.5032ZM102.56 21.3187C102.56 24.6903 104.069 25.8477 108.448 25.8477C112.675 25.8477 114.688 25.0426 114.688 21.369V21.0168C114.688 17.4439 112.675 16.7394 108.448 16.7394C104.069 16.7394 102.56 17.9471 102.56 21.3187ZM136.827 34.5032C129.731 34.5032 126.41 30.3768 126.41 24.8916V8.63742H135.871V21.4194C135.871 24.9419 137.229 26.049 141.557 26.049C145.935 26.049 146.992 24.9923 146.992 21.7213V8.63742H156.453V34H147.596V26.3006H147.093C146.539 30.5277 143.721 34.5032 136.827 34.5032Z"
                        fill={color}/>
                    <path
                        d="M2.08383 45.938C0.940355 45.938 0.278345 45.4791 0.278345 44.6215V44.6065H0.812467V44.6516C0.812467 45.276 1.18109 45.4942 2.09135 45.4942C2.92639 45.4942 3.21225 45.2986 3.21225 44.8698C3.21225 44.4786 2.97905 44.3507 2.36217 44.2529L1.36916 44.11C0.692102 44.0197 0.263299 43.7564 0.263299 43.1395C0.263299 42.485 0.887695 42.0713 1.9108 42.0713C2.97905 42.0713 3.67115 42.5227 3.67115 43.3953V43.4103H3.13703V43.3727C3.13703 42.816 2.84363 42.5151 1.89576 42.5151C1.11338 42.5151 0.789898 42.7032 0.789898 43.147C0.789898 43.5307 0.985492 43.6661 1.60237 43.7564L2.51263 43.8843C3.31005 43.9971 3.73885 44.268 3.73885 44.8698C3.73885 45.5694 3.04675 45.938 2.08383 45.938ZM9.01838 45.8628H8.21344C7.4762 45.8628 7.00226 45.5544 7.00226 44.6817V42.6054H6.34025V42.1465H7.00226V41.2588H7.5439V42.1465H9.01838V42.6054H7.5439V44.7118C7.5439 45.2309 7.79968 45.3738 8.34133 45.3738H9.01838V45.8628ZM13.4598 45.938C12.399 45.938 11.88 45.2008 11.88 44.3206V42.1465H12.4141V44.2379C12.4141 45.0127 12.7902 45.4566 13.6478 45.4566C14.5581 45.4566 15.032 44.9074 15.032 43.952V42.1465H15.5662V45.8628H15.0847V44.7043H15.0471C14.9192 45.3362 14.3851 45.938 13.4598 45.938ZM20.3655 45.938C19.1769 45.938 18.5149 45.1331 18.5149 44.0047C18.5149 42.8762 19.1769 42.0713 20.3204 42.0713C21.2006 42.0713 21.7497 42.5452 21.9152 43.1847H21.9528V40.8225H22.487V45.8628H21.998V44.7645H21.9679C21.7873 45.5092 21.1855 45.938 20.3655 45.938ZM19.0565 44.0047C19.0565 45.0804 19.6283 45.449 20.5009 45.449C21.3736 45.449 21.9528 44.945 21.9528 44.0648V43.9971C21.9528 43.0793 21.4037 42.5678 20.4859 42.5678C19.6358 42.5678 19.0565 42.9289 19.0565 44.0047ZM26.1715 47.1417H25.7051V46.6527H26.2693C26.6455 46.6527 26.7884 46.5398 26.9313 46.2314L27.1119 45.8553L25.2688 42.1465H25.8556L26.9464 44.3582L27.3601 45.2685H27.4053L27.804 44.3507L28.8346 42.1465H29.4214L27.4053 46.3819C27.1344 46.9536 26.7884 47.1417 26.1715 47.1417ZM36.9448 45.938C36.2151 45.938 35.7186 45.592 35.7186 44.9901C35.7186 44.3808 36.2226 44.1175 36.9147 44.0423L38.6826 43.8467V43.5608C38.6826 42.8386 38.3666 42.5527 37.5542 42.5527C36.7567 42.5527 36.3355 42.8386 36.3355 43.4931V43.5232H35.8013V43.4931C35.8013 42.7107 36.4483 42.0713 37.5918 42.0713C38.7202 42.0713 39.2017 42.7182 39.2017 43.5382V45.8628H38.7202V44.8623H38.6826C38.4644 45.5468 37.8099 45.938 36.9448 45.938ZM36.2527 44.9525C36.2527 45.3287 36.501 45.5243 37.0652 45.5243C37.9679 45.5243 38.6826 45.1256 38.6826 44.2303V44.2002L37.0802 44.3808C36.5235 44.4335 36.2527 44.5689 36.2527 44.9525ZM42.8595 45.8628H42.3781V40.8225H42.9122V43.1847H42.9498C43.1078 42.5452 43.6419 42.0713 44.5371 42.0713C45.7032 42.0713 46.3426 42.8762 46.3426 44.0047C46.3426 45.1331 45.7032 45.938 44.492 45.938C43.6645 45.938 43.0702 45.5092 42.8972 44.7645H42.8595V45.8628ZM42.9122 44.0648C42.9122 44.945 43.4689 45.449 44.3641 45.449C45.2518 45.449 45.801 45.0804 45.801 44.0047C45.801 42.9289 45.2368 42.5678 44.3792 42.5678C43.4388 42.5678 42.9122 43.0793 42.9122 43.9971V44.0648ZM49.8316 45.8628H49.2975V42.1465H49.7789V43.1621H49.8166C49.9294 42.5678 50.3507 42.0713 51.1255 42.0713C51.9831 42.0713 52.3593 42.7032 52.3593 43.3953V43.7639H51.8251V43.4781C51.8251 42.8461 51.5619 42.5377 50.9149 42.5377C50.1626 42.5377 49.8316 43.0116 49.8316 43.8467V45.8628ZM57.097 45.938C55.8859 45.938 55.0809 45.1331 55.0809 44.0047C55.0809 42.8762 55.8859 42.0713 57.097 42.0713C58.3157 42.0713 59.1207 42.8762 59.1207 44.0047C59.1207 45.1331 58.3157 45.938 57.097 45.938ZM57.097 45.4566C58.1201 45.4566 58.5941 44.9074 58.5941 44.0047C58.5941 43.1094 58.1201 42.5527 57.097 42.5527C56.0739 42.5527 55.6075 43.1094 55.6075 44.0047C55.6075 44.9074 56.0739 45.4566 57.097 45.4566ZM63.1604 45.938C62.4307 45.938 61.9342 45.592 61.9342 44.9901C61.9342 44.3808 62.4382 44.1175 63.1303 44.0423L64.8982 43.8467V43.5608C64.8982 42.8386 64.5822 42.5527 63.7698 42.5527C62.9723 42.5527 62.5511 42.8386 62.5511 43.4931V43.5232H62.0169V43.4931C62.0169 42.7107 62.6639 42.0713 63.8074 42.0713C64.9358 42.0713 65.4173 42.7182 65.4173 43.5382V45.8628H64.9358V44.8623H64.8982C64.68 45.5468 64.0255 45.938 63.1604 45.938ZM62.4683 44.9525C62.4683 45.3287 62.7166 45.5243 63.2808 45.5243C64.1835 45.5243 64.8982 45.1256 64.8982 44.2303V44.2002L63.2958 44.3808C62.7391 44.4335 62.4683 44.5689 62.4683 44.9525ZM70.1961 45.938C69.0074 45.938 68.3454 45.1331 68.3454 44.0047C68.3454 42.8762 69.0074 42.0713 70.1509 42.0713C71.0311 42.0713 71.5803 42.5452 71.7458 43.1847H71.7834V40.8225H72.3175V45.8628H71.8285V44.7645H71.7984C71.6179 45.5092 71.016 45.938 70.1961 45.938ZM68.8871 44.0047C68.8871 45.0804 69.4588 45.449 70.3315 45.449C71.2041 45.449 71.7834 44.945 71.7834 44.0648V43.9971C71.7834 43.0793 71.2342 42.5678 70.3164 42.5678C69.4663 42.5678 68.8871 42.9289 68.8871 44.0047ZM80.968 45.938C79.7794 45.938 79.0046 45.1331 79.0046 44.0047C79.0046 42.8762 79.7794 42.0713 80.968 42.0713C82.0062 42.0713 82.8187 42.6882 82.8187 43.5834V43.6436H82.2921V43.5984C82.2921 42.9364 81.8106 42.5603 80.9605 42.5603C79.9675 42.5603 79.5387 43.0944 79.5387 44.0047C79.5387 44.9149 79.9675 45.449 80.9605 45.449C81.8106 45.449 82.2921 45.0729 82.2921 44.4109V44.3657H82.8187V44.4259C82.8187 45.3211 82.0062 45.938 80.968 45.938ZM87.6534 45.938C86.4422 45.938 85.6373 45.1331 85.6373 44.0047C85.6373 42.8762 86.4422 42.0713 87.6534 42.0713C88.8721 42.0713 89.6771 42.8762 89.6771 44.0047C89.6771 45.1331 88.8721 45.938 87.6534 45.938ZM87.6534 45.4566C88.6765 45.4566 89.1505 44.9074 89.1505 44.0047C89.1505 43.1094 88.6765 42.5527 87.6534 42.5527C86.6303 42.5527 86.1639 43.1094 86.1639 44.0047C86.1639 44.9074 86.6303 45.4566 87.6534 45.4566ZM93.2203 45.8628H92.6861V42.1465H93.1676V43.3125H93.2052C93.3331 42.6806 93.8597 42.0713 94.785 42.0713C95.8307 42.0713 96.3498 42.816 96.3498 43.6962V45.8628H95.8157V43.7714C95.8157 43.0041 95.447 42.5603 94.597 42.5603C93.6942 42.5603 93.2203 43.1094 93.2203 44.0648V45.8628ZM101.15 45.938C100.006 45.938 99.3444 45.4791 99.3444 44.6215V44.6065H99.8785V44.6516C99.8785 45.276 100.247 45.4942 101.157 45.4942C101.992 45.4942 102.278 45.2986 102.278 44.8698C102.278 44.4786 102.045 44.3507 101.428 44.2529L100.435 44.11C99.7581 44.0197 99.3293 43.7564 99.3293 43.1395C99.3293 42.485 99.9537 42.0713 100.977 42.0713C102.045 42.0713 102.737 42.5227 102.737 43.3953V43.4103H102.203V43.3727C102.203 42.816 101.91 42.5151 100.962 42.5151C100.179 42.5151 99.8559 42.7032 99.8559 43.147C99.8559 43.5307 100.052 43.6661 100.668 43.7564L101.579 43.8843C102.376 43.9971 102.805 44.268 102.805 44.8698C102.805 45.5694 102.113 45.938 101.15 45.938ZM107.362 45.938C106.301 45.938 105.782 45.2008 105.782 44.3206V42.1465H106.317V44.2379C106.317 45.0127 106.693 45.4566 107.55 45.4566C108.461 45.4566 108.934 44.9074 108.934 43.952V42.1465H109.469V45.8628H108.987V44.7043H108.95C108.822 45.3362 108.288 45.938 107.362 45.938ZM113.2 45.8628H112.666V40.8225H113.2V45.8628ZM118.676 45.8628H117.871C117.134 45.8628 116.66 45.5544 116.66 44.6817V42.6054H115.998V42.1465H116.66V41.2588H117.202V42.1465H118.676V42.6054H117.202V44.7118C117.202 45.2309 117.457 45.3738 117.999 45.3738H118.676V45.8628ZM122.591 45.938C121.861 45.938 121.365 45.592 121.365 44.9901C121.365 44.3808 121.869 44.1175 122.561 44.0423L124.329 43.8467V43.5608C124.329 42.8386 124.013 42.5527 123.2 42.5527C122.403 42.5527 121.981 42.8386 121.981 43.4931V43.5232H121.447V43.4931C121.447 42.7107 122.094 42.0713 123.238 42.0713C124.366 42.0713 124.848 42.7182 124.848 43.5382V45.8628H124.366V44.8623H124.329C124.11 45.5468 123.456 45.938 122.591 45.938ZM121.899 44.9525C121.899 45.3287 122.147 45.5243 122.711 45.5243C123.614 45.5243 124.329 45.1256 124.329 44.2303V44.2002L122.726 44.3808C122.17 44.4335 121.899 44.5689 121.899 44.9525ZM128.558 45.8628H128.024V42.1465H128.506V43.3125H128.543C128.671 42.6806 129.198 42.0713 130.123 42.0713C131.169 42.0713 131.688 42.816 131.688 43.6962V45.8628H131.154V43.7714C131.154 43.0041 130.785 42.5603 129.935 42.5603C129.032 42.5603 128.558 43.1094 128.558 44.0648V45.8628ZM136.631 45.938C135.442 45.938 134.667 45.1331 134.667 44.0047C134.667 42.8762 135.442 42.0713 136.631 42.0713C137.669 42.0713 138.481 42.6882 138.481 43.5834V43.6436H137.955V43.5984C137.955 42.9364 137.473 42.5603 136.623 42.5603C135.63 42.5603 135.201 43.0944 135.201 44.0047C135.201 44.9149 135.63 45.449 136.623 45.449C137.473 45.449 137.955 45.0729 137.955 44.4109V44.3657H138.481V44.4259C138.481 45.3211 137.669 45.938 136.631 45.938ZM141.984 47.1417H141.518V46.6527H142.082C142.458 46.6527 142.601 46.5398 142.744 46.2314L142.925 45.8553L141.082 42.1465H141.669L142.759 44.3582L143.173 45.2685H143.218L143.617 44.3507L144.648 42.1465H145.234L143.218 46.3819C142.947 46.9536 142.601 47.1417 141.984 47.1417Z"
                        fill={color}/>
                </svg>
            </Link>
        </>
    )
}
export default Logo