﻿///<reference path="./typings/main.d.ts" />
import tl = require("vsts-task-lib/task");

let msbuildAdditionalArguments: string[] = new Array<string>();
const variableName = tl.getInput("variableName", true);

// MSBUILD
const buildInParallel = tl.getBoolInput("MsBuildBuildInParallel", false);
if (buildInParallel) {
    msbuildAdditionalArguments.push(`/p:BuildInParallel=true`);
} else {
    msbuildAdditionalArguments.push(`/p:BuildInParallel=false`);
}

const maxCpuCount = +tl.getInput("MsBuildMaxCpuCount", false);
if (buildInParallel) {
    msbuildAdditionalArguments.push(`/m:${maxCpuCount}`);
}

// CODE ANALYSIS
const runCodeAnalysis = tl.getInput("RunCodeAnalysis", false);
if (runCodeAnalysis !== "" && runCodeAnalysis !== "AsConfigured") {
    msbuildAdditionalArguments.push(`/p:RunCodeAnalysis=${runCodeAnalysis}`);
}

const codeAnalysisRuleset = tl.getInput("CodeAnalysisRuleset", false);
if (codeAnalysisRuleset !== "" && codeAnalysisRuleset !== "AsConfigured") {
    if (codeAnalysisRuleset !== "Custom") {
        msbuildAdditionalArguments.push(`/p:CodeAnalysisRuleset=${codeAnalysisRuleset}`);
    } else {
        const customCodeAnalysisRuleset = tl.getPathInput("CustomCodeAnalysisRuleset", true);
        msbuildAdditionalArguments.push(`/p:CodeAnalysisRuleset=${customCodeAnalysisRuleset}`);
    }
}

const codeAnalysisTreatWarningsAsErrors = tl.getBoolInput("CodeAnalysisTreatWarningsAsErrors", false);
if (codeAnalysisTreatWarningsAsErrors) {
    msbuildAdditionalArguments.push(`/p:CodeAnalysisTreatWarningsAsErrors=${codeAnalysisTreatWarningsAsErrors}`);
}

const codeAnalysisAdditionalArguments = tl.getInput("CodeAnalysisAdditionalArguments", false);
if (codeAnalysisAdditionalArguments) {
    msbuildAdditionalArguments.push(codeAnalysisAdditionalArguments);
}

// LAYER VALIDATION
const validateArchitecture = tl.getInput("ValidateArchitecture", false);
if (validateArchitecture !== "" && validateArchitecture !== "AsConfigured") {
    msbuildAdditionalArguments.push(`/p:ValidateArchitecture=${validateArchitecture}`);
}

tl.setVariable(variableName, msbuildAdditionalArguments.join(" "));