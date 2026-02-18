import Sidebar from '@/pages/profile/Sidebar';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Wishlist from './sidebarpages/Wishlist';
import Settings from './sidebarpages/Settings';
import Manage from './sidebarpages/manageProducts/Manage';
import Notifications from './sidebarpages/Notifications';
import { useWindowScroll } from '@uidotdev/usehooks';



const Profile = () => {

  const location = useLocation()
  const [{ x, y }, scrollTo] = useWindowScroll();


  return (
    <div className='relative mx-4 my-5 md:mt-[120px] max-w-[1232px] lg:mx-[64px] xl:mx-auto xl:w-full xl:px-[32px]'>
        <div className='md:hidden'>
            <div className='font-bold text-[20px]'>HELLO, GIO</div>
            <Link to="/cart" className='flex gap-2 h-[40px] mt-2  items-center justify-center w-full rounded-lg bg-[#B4D984]'>
              <div><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.95153 11.6052C4.50443 11.6052 4.95741 12.0679 4.95741 12.6394C4.95741 13.204 4.50443 13.6667 3.95153 13.6667C3.39196 13.6667 2.93898 13.204 2.93898 12.6394C2.93898 12.0679 3.39196 11.6052 3.95153 11.6052ZM11.4457 11.6052C11.9986 11.6052 12.4516 12.0679 12.4516 12.6394C12.4516 13.204 11.9986 13.6667 11.4457 13.6667C10.8861 13.6667 10.4331 13.204 10.4331 12.6394C10.4331 12.0679 10.8861 11.6052 11.4457 11.6052ZM0.852802 0.333423L0.920689 0.339169L2.50945 0.583411C2.73594 0.624912 2.90248 0.814726 2.92246 1.04604L3.04903 2.57C3.06901 2.78839 3.24221 2.95167 3.45538 2.95167H12.4517C12.8581 2.95167 13.1245 3.09454 13.391 3.4075C13.6574 3.72046 13.7041 4.16948 13.6441 4.577L13.0113 9.04003C12.8914 9.89794 12.1719 10.53 11.3259 10.53H4.05824C3.17227 10.53 2.4395 9.83671 2.36623 8.93866L1.75337 1.52228L0.74749 1.34539C0.481031 1.29777 0.29451 1.03243 0.34114 0.760299C0.387771 0.48204 0.647568 0.297668 0.920689 0.339169L0.852802 0.333423ZM10.2601 5.46825H8.41485C8.13507 5.46825 7.91524 5.69276 7.91524 5.9785C7.91524 6.25744 8.13507 6.48876 8.41485 6.48876H10.2601C10.5399 6.48876 10.7597 6.25744 10.7597 5.9785C10.7597 5.69276 10.5399 5.46825 10.2601 5.46825Z" fill="currentColor"></path></svg></div>
              <div className='font-bold text-[12px]'>View shopping cart</div>
            </Link>
        </div>

        <div className='hidden md:flex gap-5 items-center border-b pb-4'>
          <div>
            <span className='flex items-center justify-center w-8 h-8 bg-[#c4c4c43d] rounded-full' >
              <svg width="12" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.31579 10.5391C9.74046 10.5391 12.6316 11.1026 12.6316 13.2789C12.6316 15.4553 9.72192 16 6.31579 16C2.89112 16 0 15.4356 0 13.2602C0 11.0838 2.90882 10.5391 6.31579 10.5391ZM6.31579 0C8.63543 0 10.4948 1.88348 10.4948 4.23313C10.4948 6.58278 8.63543 8.46626 6.31579 8.46626C3.99615 8.46626 2.13673 6.58278 2.13673 4.23313C2.13673 1.88348 3.99615 0 6.31579 0Z" fill="currentColor"></path></svg>
            </span>
          </div>
          <div className='font-bold text-[20px] lg:text-[24px]'>HELLO, GIORGI ABLO</div>
        </div>

        <div className=' mt-5 xl:mt-8 md:ml-2 xl:ml-3 md:flex md:gap-8'>
          <div className='md:w-[224px] xl:w-[252px]'>
            <div className="lg:sticky top-[38px]">
              <Sidebar />
            </div>
          </div>

          <div className={`absolute top-0 left-0 z-10 bg-white md:static h-screen md:h-auto w-full ${["/profile/manage", "/profile/wishlist", "/profile/settings", "/profile/notifications"].includes(location.pathname) ? "" : 'hidden'}`}>
              <Routes>
                  <Route path="wishlist" element={<Wishlist />} />
                  <Route path="manage" element={<Manage />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="notifications" element={<Notifications />} />
                 
              </Routes>
          </div>
        </div>
    </div>
    
  )
}

export default Profile