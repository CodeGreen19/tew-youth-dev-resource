import { jsPDF } from "jspdf"
import { StudentDetailsByEnrollmentId } from "../types"

export const registrationCardPDF = async (
    data: StudentDetailsByEnrollmentId,
    branchName: string,
) => {
    const doc = new jsPDF("p", "mm", "a4")

    // Add the header image
    const img = new Image()
    img.src = "/registration.jpeg" // Template background
    doc.addImage(img, "JPEG", 10, 10, 190, 277) // Full-page template

    const profileImg = new Image()
    profileImg.src = data.image.secureUrl // Cloudinary URL
    doc.addImage(profileImg, "JPEG", 150, 135, 30, 30) // Position & size of profile picture

    // image for overwridding

    const img2 = new Image()
    img2.src = "/white.png"
    doc.addImage(img2, "PNG", 51, 212, 5, 5)

    // Set font settings
    doc.setFont("helvetica", "normal")
    doc.setTextColor(0, 0, 0)

    // Add the title text
    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.text(data.email || "Course Name", 105, 120, {
        align: "center",
    })

    // Add registration details
    const startY = 142

    doc.setFontSize(13)
    const labels = [
        { y_axis: 0, value: data.name },
        { y_axis: 9, value: data.fatherName },
        { y_axis: 18, value: data.motherName },
        { y_axis: 28, value: data.gender },
        { y_axis: 39, value: data.dateOfBirth },
        { y_axis: 47, value: branchName },
        {
            y_axis: 57,
            value: data.enrollments[0].rollNumber || "N/A",
        },
        {
            y_axis: 74,
            value:
                data.enrollments[0].registrationNumber ||
                "N/A",
        },
    ]
    // uncomment // TODO
    //   labels.forEach((item) => {
    //     const y = startY + item.y_axis;
    //     doc.text(``, 20, y);
    //     doc.text(item.value || "N/A", 88, y);
    //   });
    //   doc.setFontSize(10);
    //   doc.text(data.courseRange, 136, 217);
    //   doc.text(new Date(data.createdAt).getFullYear().toString(), 142, 224);

    // Save the PDF
    doc.save(`${data.name}_Registration_Card.pdf`)
}
