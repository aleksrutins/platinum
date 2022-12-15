plugins {
    id("application")
}

dependencies {
    implementation(project(":lib"))
}

application {
    mainClass.set("platinum.editor.Editor")
}