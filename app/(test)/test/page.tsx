import { AddTest } from "./_components/add-test"
import TestsList from "./_components/tests-list"
import { getTests } from "./_server/queries"

export default async function page() {
    const tests = await getTests()
    return (
        <div>
            <AddTest />
            <TestsList tests={tests} />
        </div>
    )
}
