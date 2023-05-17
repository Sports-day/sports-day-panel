import ReactMarkdown from "react-markdown";


const markdown = `
# 使い方
## Markdownでカキカキ
Markdown最高かよ!  
Markdown最高かよ!
`
export function HowToUse() {
    return (
        <>
            <ReactMarkdown>{markdown}</ReactMarkdown>
        </>
    )
}