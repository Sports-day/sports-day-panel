import type {NextPage} from 'next'
import {useSession} from "next-auth/react";
import {useFetchAllowedDomains} from "../../src/features/allowed-domains/hooks";
import {useFetchClasses} from "../../src/features/classes/hooks";
import {classFactory} from "../../src/models/ClassModel";


const AdminIndex: NextPage = () => {
    const {data: session} = useSession()
    const {allowedDomains: domains} = useFetchAllowedDomains()
    const {classes: classes} = useFetchClasses()

    if (session) {
        const domainsData = domains.map((domain) => {
            return (
                <div key={domain.id}>
                    <p>domains: {domain.domain}</p>
                    <br/>
                </div>
            )
        })

        const classesData = classes.map((class_) => {
            return (
                <div key={class_.id}>
                    <p>classes: {class_.name}</p>
                    <br/>
                </div>
            )
        })

        return (
            <>
                <h1>AllowedDomains</h1>
                {domainsData}

                <h1>Classes</h1>
                {classesData}

                <h2>execute</h2>
                <button onClick={post}>
                    button 1
                </button>
                <button>
                    button 2
                </button>
            </>
        )
    } else {
        return (<p>please login</p>)
    }
}

const post = async () => {
    await classFactory().create({
        name: "test",
        description: "test",
        groupId: 1,
    })
}

export default AdminIndex
