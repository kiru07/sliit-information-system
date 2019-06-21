import React from "react"
import FileUpload from "../fileUpload"
import SubmissionForm from '../submissionForm'
import ShallowRenderer from "react-test-renderer/shallow"

describe("<SubmissionForm />", () => {
  it("should render the SubmissionForm and its children", () => {
    const renderer = new ShallowRenderer()
    renderer.render(
      <SubmissionForm>
        <FileUpload />
      </SubmissionForm>
    )
    const result = renderer.getRenderOutput()
    console.log(result)
    expect(result.type).toBe("div")
  })
})
