

export default function AboutPage(){
    let env = "";
    if (process.env.NODE_ENV === 'production'){
        env = 'PRODUCTION'
    }else if (process.env.NODE_ENV === 'development'){
        env = 'DEVELOPMENT'
    }

    return (
        <>
            <main>
                <h1>
                    {env}
                </h1>
            </main>
        </>
    )
}