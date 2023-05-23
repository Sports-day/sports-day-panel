import ReactMarkdown from "react-markdown";


const markdown = `
# 使い方
あとで書きます
`
export function HowToUse() {
    return (
        <>
            <ReactMarkdown>{markdown}</ReactMarkdown>
        </>
    )
}