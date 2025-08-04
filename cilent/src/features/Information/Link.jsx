export default function Link({pre, children, src, type}){
    return(
        <>
        <span className="block text-sm font-normal text-blue-950">{pre} 
            <a href={src} className="text-blue-400 cursor-pointer" target="_blank" rel="noopener noreferrer">
            {type == 'github' && (
                <Image src='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png' alt='github' />
            )}
            {type == 'npm' && (
                <Image src='https://upload.wikimedia.org/wikipedia/commons/d/db/Npm-logo.svg' alt='npm'/>
            )}
            {children}
            </a>
        </span>
        </>
    )
}

function Image({src, alt}){
    return (
        <img src={src} className="inline" width="20" alt={alt}/>
    )
}