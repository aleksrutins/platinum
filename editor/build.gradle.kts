import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    id("application")
    kotlin("jvm") version "2.2.21"
}

dependencies {
    implementation(project(":lib"))
    implementation(kotlin("stdlib-jdk8"))
}

application {
    mainClass.set("platinum.editor.Editor")
}
repositories {
    mavenCentral()
}
