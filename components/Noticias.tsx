//alt+z
import n1 from "../assets/N1.jpeg";
import n2 from "../assets/N2.jpg.webp";
import n3 from "../assets/N3.jpeg";

type Props = {}

function Noticias({ }: Props) {
    return (
        <>
            <div>
                <img src={n1} className='object-cover rounded-lg mb-5' />

                <p className='mt-2 font-bold'>Volver al futuro.</p>
                <p className='mt-2'>Back to the Future se compone principalmente de un conjunto de tres películas de ciencia ficción estadounidenses dirigidas por Robert Zemeckis, producidas por Steven Spielberg, Bob Gale y Neil Canton y distribuidas por Universal Pictures. Sus protagonistas son Michael J</p>

            </div>
            <hr className='my-8' />
            <div>
                <img src={n2} className='h-40 object-cover rounded-lg' />

                <p className='mt-2 font-bold'>¿Qué pasó con Volver al futuro 4?</p>
                <p className='mt-2'>Aunque las tres entregas publicadas hasta fecha de hoy hayan sido un éxito entre el público, por desgracia no se está desarrollando una Regreso al futuro 4. Entre otras cosas, porque lamentablemente a Michael J. Fox se le diagnosticó la enfermedad de Parkinson hace años... <a href="https://vandal.elespanol.com/noticia/r20306/hacen-un-trailer-de-regreso-al-futuro-4-tan-bueno-que-parece-real-y-hace-sonar-a-los-fans#:~:text=Aunque%20las%20tres%20entregas%20publicadas,enfermedad%20de%20Parkinson%20hace%20años." className="dark:text-[#cf2638]"> Leer más</a></p>
            </div>
            <hr className='my-8' />
            <div className=" object-center">
                <img src={n3} className='h-40 object-cover rounded-lg mx-auto' />

                <p className='mt-2 font-bold'>¿Dónde puedo ver de vuelta al futuro?</p>
                <p className='mt-2'>Actualmente se puede ver "Regreso al futuro" streaming en Netflix, Amazon Prime Video, Filmin, Movistar Plus, Netflix basic with Ads, SkyShowtime.</p>
            </div>

        </>

    )
}
export default Noticias;

