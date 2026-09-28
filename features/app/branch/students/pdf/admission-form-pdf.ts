import { jsPDF } from "jspdf"
import {
    CourseDuration,
    getCourseRangeLabel,
    getDuration,
} from "../constants"
import {
    Course,
    StudentDetailsByEnrollmentId,
} from "../types"

export const admissionFormPDF = (
    data: StudentDetailsByEnrollmentId,
    courses: Course[],
) => {
    const doc = new jsPDF("p", "mm", "a4")

    // Add the header image
    const img = new Image()
    img.src = "/logo.png" // Path to the image
    doc.addImage(img, "PNG", 85, 10, 40, 40) // Adjust positioning and size
    // for signature
    const img2 = new Image()
    img2.src = "/signature.png" // Path to the image
    doc.addImage(img2, "PNG", 132, 253, 38, 17)

    doc.setGState(doc.GState({ opacity: 0.2 }))

    // Add the image to cover the whole page as a watermark
    doc.addImage(img, "PNG", 30, 80, 140, 140)

    // Reset transparency for further elements
    doc.setGState(doc.GState({ opacity: 1 }))

    // Add the header text
    doc.setFontSize(16)
    doc.setTextColor(0, 0, 0)
    doc.setFont("helvetica", "bold")
    doc.text("Admission Confirmation Form", 105, 55, {
        align: "center",
    })

    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.text(
        "The Earn Way Youth Development Resource",
        105,
        62,
        {
            align: "center",
        },
    )
    doc.text(
        "Sohidul Islam Market, Damurhuda, Chuadanga",
        105,
        68,
        {
            align: "center",
        },
    )

    // Add a line separator below the header
    doc.line(15, 75, 195, 75)

    // Add Personal Details section
    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.text("Personal Details", 15, 85)
    doc.setLineWidth(0.5)
    doc.line(15, 87, 47, 87)

    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.text(`Name: ${data.name}`, 15, 95)
    doc.text(`Father's Name: ${data.fatherName}`, 105, 95)

    doc.text(`Mother's Name: ${data.motherName}`, 15, 105)
    doc.text(`Mobile: ${data.mobile}`, 105, 105)

    doc.text(`Gender: ${data.gender}`, 15, 115)
    doc.text(`Date of Birth: ${data.dateOfBirth}`, 105, 115)

    doc.text(`Nationality: ${data.nationality}`, 15, 125)
    doc.text(`Religion: ${data.religion}`, 105, 125)

    doc.text(`Blood Group: ${data.bloodGroup}`, 15, 135)
    doc.text(`Email: ${data.email || "N/A"}`, 105, 135)

    // Add Course Details section
    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.text("Course Details", 15, 145)
    doc.line(15, 147, 46, 147)

    const enrollment = data.enrollments[0]
    const duration =
        enrollment.courseDuration as CourseDuration
    const courseDuration = getDuration(duration)
    const courseRange = getCourseRangeLabel(
        enrollment.courseRange,
        duration,
    )
    const course = courses.find(
        (c) => c.id === enrollment.courseId,
    )?.name

    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.text(`Course Duration: ${courseDuration}`, 15, 155)
    doc.text(`Course Range: ${courseRange}`, 105, 155)

    doc.text(`Course Trade: ${course}`, 15, 165)
    doc.text(`Medium: ${enrollment.medium}`, 105, 165)

    // Add Academic Details section
    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.text("Academic Details", 15, 175)
    doc.line(15, 177, 49, 177)

    const qualification = data.qualifications[0]

    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.text(
        `Passed Board: ${qualification.institution}`,
        15,
        185,
    )
    doc.text(
        `Passed Year: ${qualification.passingYear}`,
        105,
        185,
    )

    doc.text(
        `Passed Roll: ${qualification.rollId}`,
        15,
        195,
    )
    doc.text(
        `Passed Result: ${qualification.result}`,
        105,
        195,
    )

    // Add footer lines for signature
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.text("Student's Signature", 15, 275)

    doc.text("Authority's Signature", 135, 275)
    doc.line(15, 271, 48, 271) // Adjusted line width for student's signature
    doc.line(135, 271, 168, 271) // Adjusted line width for authority's signature
    doc.setFontSize(11)
    doc.text(
        "NB: Please note that all payments made upon admission are non-refundable.",
        15,
        289,
    )

    // Save the PDF
    doc.save(
        `${data.name.toLocaleLowerCase()}-admission-form.pdf`,
    )
}
