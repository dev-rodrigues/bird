import reactLogo from '@/assets/react.svg'
import viteLogo from '/vite.svg'

export default function DemoComponent() {
  return(
    <div className="w-full flex p-4 justify-evenly items-center bg-red-400">
      <a href="https://vite.dev" target="_blank" rel="noreferrer">
        <img src={viteLogo} className="size-16" alt="Vite logo" />
      </a>
      <a href="https://react.dev" target="_blank" rel="noreferrer">
        <img src={reactLogo} className="size-16 animate-react" alt="React logo" />
      </a>
    </div>
  )
}