import Header from '../components/Header'
import Component1 from '../components/Component1'
import Component2 from '../components/Component2'
import Footer from '../components/Footer'

const HomeLayout = () => {
  return (
    <div className="flex flex-col w-full">
      <section className="h-screen w-full">
        <Header />
      </section>

      <main className="w-full">
        <div className="w-full px-4 py-16 space-y-16">
          <div className="flex justify-center w-full h-screen">
            <Component1 />
          </div>
          <div className="flex justify-center w-full h-screen">
            <Component2 />
          </div>
        </div>
      </main>

      <div className="w-full h-[60vh]">
        <Footer />
      </div>
    </div>
  )
}

export default HomeLayout 