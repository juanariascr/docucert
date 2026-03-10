// src/utils/crypto.ts

export const generateMockVC = (student: any, index: number) => ({
    "@context": ["https://www.w3.org/2018/credentials/v1"],
    "id": `https://docucert.app/credentials/${Math.floor(Math.random() * 100000)}`,
    "type": ["VerifiableCredential", "UniversityDegreeCredential"],
    "issuer": "did:web:university.edu",
    "issuanceDate": new Date().toISOString(),
    "credentialSubject": {
        "id": `did:ethr:0x${Math.random().toString(16).slice(2, 12)}...`,
        "degree": {
            "type": "Degree",
            "name": student.major,
            "student": student.name,
            "graduationDate": student.date,
            "gpa": student.gpa || "N/A", // <-- ADDED GPA HERE
            "studentEmail": student.email
        }
    },
    "credentialStatus": {
        "id": "did:ethr:0x123456789abcdef#revocationRegistry",
        "type": "EthrCredentialStatus2020",
        "statusPurpose": "revocation",
        "statusListIndex": index.toString()
    },
    "proof": {
        "type": "EcdsaSecp256k1Signature2019",
        "created": new Date().toISOString(),
        "proofPurpose": "assertionMethod",
        "verificationMethod": "did:web:university.edu#key-1",
        "jws": "eyJhbGciOiJFUzI1NksiLCJiNjQiOmZhbHNlLCJjcml0IjpbImI2NCJdfQ..MockSignatureHash12345"
    }
});
export const simulateBackendProcessing = async (students: any[]) => {
    // Simulate network processing delay
    await new Promise(r => setTimeout(r, 1500));

    const currentRegistry = JSON.parse(localStorage.getItem('docucert_registry') || '{}');
    // Grab existing credentials or start an empty array
    const issuedCredentials = JSON.parse(localStorage.getItem('docucert_issued') || '[]');

    students.forEach(student => {
        const newIndex = Math.floor(Math.random() * 10000);
        const newVC = generateMockVC(student, newIndex);

        // Add to the array of issued credentials
        issuedCredentials.push(newVC);

        // Save to simulated blockchain registry (false = valid/not revoked)
        currentRegistry[newIndex.toString()] = false;
    });

    // Save both the updated array and the registry
    localStorage.setItem('docucert_issued', JSON.stringify(issuedCredentials));
    localStorage.setItem('docucert_registry', JSON.stringify(currentRegistry));

    return true;
};