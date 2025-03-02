export const ZapCell =  ({
    name,
    index
}: {
    name?: string;
    index: number
}) => {
    return <div className="border border-black px-8 py-8 flex w-[300px] justify-center cursor-pointer">
        <div className="font text-xl flex">
            <div className="font-bold">
                {index}.
            </div>
            <div>
                {name}
            </div>
        </div>
    </div>
}