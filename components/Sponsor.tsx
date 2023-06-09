import Noticias from "../components/Noticias"



type Props = {}

function Sponsor({ }: Props) {
    return (
        <div className='overflow-auto bg-white dark:bg-gray-800 rounded-lg mt-5'>

            <div className='pt-4 pb-2 pl-6 dark:text-gray-200'>
                <h2>Noticias</h2>
            </div>
            
            <div className='overflow-auto h-[45vh]  mx-5 mb-5 dark:text-gray-200 rounded-md'>
                <Noticias/>
            </div>


        </div>
    )
}

export default Sponsor