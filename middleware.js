import { NextResponse } from 'next/server'
import axios from 'axios';
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('token')

  const headers = {
    'Content-Type': 'application/json',
    'jwt': data
  };
  try {
    axios.post(`http://localhost:8000/auth/get-token`,{
      headers: headers
    })
    .then(res => {
    if (res.data.status == 200) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
      return NextResponse.redirect(new URL('/login', request.url))
    })
  } catch (error) {
    console.log("error")

  };
}

}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/dashboard/:path*',
}