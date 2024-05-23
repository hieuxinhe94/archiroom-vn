import TwoColumnsBlock from './twoColumnsBlock'


export default function TwoColumnsBlocks({twoColumns}) {

    return (
        <>
            <div className="relative background-filter">
                <div className="bg-blue-radial-gradient w-[900px] h-[900px] lg:w-[1200px] lg:h-[1200px] opacity-90 lg:opacity-50 absolute top-[300px] lg:top-0 left-[-200px] lg:left-[-600px]"></div>
                <div className="bg-blue-radial-gradient w-[1200px] h-[1200px] opacity-50 absolute top-[600px] right-[-600px]"></div>
                <div className="bg-purple-radial-gradient w-[1200px] h-[1200px] opacity-50 absolute top-[1000px] left-[-600px]"></div>
            </div>
            {
                twoColumns.map(block => <TwoColumnsBlock key={block._id} block={block} />)
            }
        </>
    )
}